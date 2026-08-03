import prisma from "../../lib/prisma.js";

// Create Media
export const createMediaIntoDB = async (payload: any) => {
  const result = await prisma.media.create({
    data: payload,
  });

  return result;
};

// Get all media (Pagination, sorting, search option included)
export const getAllMediaFromDB = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Sorting and Searching logic
  const searchTerm = query.searchTerm;
  const whereConditions: any = {};

  if (searchTerm) {
    whereConditions.title = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  // dynamic sorting
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";

  const result = await prisma.media.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.media.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};
