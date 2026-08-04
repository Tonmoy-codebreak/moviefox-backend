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

// logged-in user's completed media list
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

// Remove media from completed list
const removeFromCompletedListFromDB = async (
  completedId: string,
  userInfo: any,
) => {
  const existingEntry = await prisma.completedMedia.findUnique({
    where: { id: completedId },
  });

  if (!existingEntry) {
    throw new Error("Completed media entry not found!");
  }

  const currentUserId = userInfo.id || userInfo.userId;

  if (userInfo.role !== "ADMIN" && existingEntry.userId !== currentUserId) {
    throw new Error("You are not authorized to remove this entry!");
  }

  const deletedEntry = await prisma.completedMedia.delete({
    where: { id: completedId },
  });

  return deletedEntry;
};

// Completed Count per Media
const getCompletedCountByMediaIdFromDB = async (mediaId: string) => {
  const mediaExist = await prisma.media.findUnique({
    where: { id: mediaId, deletedAt: null },
    select: { id: true, title: true, slug: true },
  });

  if (!mediaExist) {
    throw new Error("Media not found!");
  }

  const completedCount = await prisma.completedMedia.count({
    where: { mediaId },
  });

  return {
    media: mediaExist,
    completedCount,
  };
};

export const CompletedMediaService = {
  addToCompletedListIntoDB,
  getMyCompletedListFromDB,
  removeFromCompletedListFromDB,
  getCompletedCountByMediaIdFromDB,
};
