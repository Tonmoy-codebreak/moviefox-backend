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
      hasSpoiler: payload.hasSpoiler || false,
      status: "PENDING",
      isPublished: false,
    },
  });

  return result;
};

// User delete Review
const deleteReviewIntoDB = async (reviewId: string, userInfo: any) => {
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!existingReview) {
    throw new Error("Review not found!");
  }

  if (userInfo.role !== "ADMIN" && existingReview.userId !== userInfo.id) {
    throw new Error("You are not authorized to delete this review!");
  }

  const deletedReview = await prisma.review.delete({
    where: { id: reviewId },
  });

  return deletedReview;
};

// Get all reviews for specific media
const getReviewsByMediaIdFromDB = async (mediaId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      mediaId: mediaId,
      status: "APPROVED",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // লেটেস্ট রিভিউগুলো আগে দেখানোর জন্য
    },
  });

  return reviews;
};

// Get all pending reviews
const getPendingReviewsFromDB = async () => {
  const result = await prisma.review.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      media: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return result;
};

// ================================================================
export const ReviewService = {
  createReviewIntoDB,
  deleteReviewIntoDB,
  getReviewsByMediaIdFromDB,
  getPendingReviewsFromDB,
};
