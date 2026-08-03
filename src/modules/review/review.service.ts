import prisma from "../../lib/prisma.js";

interface IReviewPayload {
  userId: string;
  mediaId: string;
  rating: number;
  content?: string;
  tags?: string[];
  hasSpoiler?: boolean;
}

// Create Review
const createReviewIntoDB = async (payload: IReviewPayload) => {
  const isMediaExists = await prisma.media.findUnique({
    where: { id: payload.mediaId },
  });

  if (!isMediaExists) {
    throw new Error("Media not found!");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: payload.userId,
      mediaId: payload.mediaId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this media!");
  }

  const result = await prisma.review.create({
    data: {
      userId: payload.userId,
      mediaId: payload.mediaId,
      rating: payload.rating,
      content: payload.content ?? null,
      tags: payload.tags || [],
      hasSpoiler: payload.hasSpoiler || false,
      status: "PENDING",
      isPublished: false,
    },
  });

  return result;
};

// ================================================================
export const ReviewService = {
  createReviewIntoDB,
};
