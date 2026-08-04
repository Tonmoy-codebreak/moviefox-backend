import prisma from "../../lib/prisma.js";

// Add media to watchlist
const addToWatchlistIntoDB = async (userId: string, mediaId: string) => {
  const mediaExist = await prisma.media.findUnique({
    where: { id: mediaId, deletedAt: null },
  });

  if (!mediaExist) {
    throw new Error("Media not found!");
  }

  const isAlreadyInWatchlist = await prisma.watchlist.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });

  if (isAlreadyInWatchlist) {
    throw new Error("This media is already in your watchlist!");
  }

  const result = await prisma.watchlist.create({
    data: {
      userId,
      mediaId,
    },
    include: {
      media: {
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          type: true,
        },
      },
    },
  });

  return result;
};

export const WatchlistService = {
  addToWatchlistIntoDB,
};
