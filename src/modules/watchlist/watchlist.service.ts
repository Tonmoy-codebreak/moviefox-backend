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

// Get logged-in user's watchlist
const getMyWatchlistFromDB = async (userId: string) => {
  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    include: {
      media: {
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          access: true,
          releaseYear: true,
          posterUrl: true,
          avgRating: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return watchlist;
};

// Remove media from watchlist
const removeFromWatchlistFromDB = async (
  watchlistId: string,
  userInfo: any,
) => {
  const existingEntry = await prisma.watchlist.findUnique({
    where: { id: watchlistId },
  });

  if (!existingEntry) {
    throw new Error("Watchlist entry not found!");
  }

  const currentUserId = userInfo.id || userInfo.userId;

  if (userInfo.role !== "ADMIN" && existingEntry.userId !== currentUserId) {
    throw new Error("You are not authorized to remove this entry!");
  }

  const deletedEntry = await prisma.watchlist.delete({
    where: { id: watchlistId },
  });

  return deletedEntry;
};

// Get watchlist count for a specific media
const getWatchlistCountByMediaIdFromDB = async (mediaId: string) => {
  const mediaExist = await prisma.media.findUnique({
    where: { id: mediaId, deletedAt: null },
    select: { id: true, title: true, slug: true },
  });

  if (!mediaExist) {
    throw new Error("Media not found!");
  }

  const watchlistCount = await prisma.watchlist.count({
    where: { mediaId },
  });

  return {
    media: mediaExist,
    watchlistCount,
  };
};

export const WatchlistService = {
  addToWatchlistIntoDB,
  getMyWatchlistFromDB,
  removeFromWatchlistFromDB,
  getWatchlistCountByMediaIdFromDB,
};
