import prisma from "../../lib/prisma.js";

// adding media to completed list
const addToCompletedListIntoDB = async (userId: string, mediaId: string) => {
  const mediaExist = await prisma.media.findUnique({
    where: { id: mediaId, deletedAt: null },
  });

  if (!mediaExist) {
    throw new Error("Media not found!");
  }

  const isAlreadyCompleted = await prisma.completedMedia.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });

  if (isAlreadyCompleted) {
    throw new Error("This media is already in your completed list!");
  }

  const result = await prisma.completedMedia.create({
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

// whole completed list access by logged in user
const getMyCompletedListFromDB = async (userId: string) => {
  const completedList = await prisma.completedMedia.findMany({
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

  return completedList;
};

export const CompletedMediaService = {
  addToCompletedListIntoDB,
  getMyCompletedListFromDB,
};
