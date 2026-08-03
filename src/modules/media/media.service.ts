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

  // Only media with no deleted At record will show
  whereConditions.deletedAt = null;

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

// Get single media details from Db
export const getSingleMediaFromDB = async (id: string) => {
  const result = await prisma.media.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new Error("Media not found!");
  }

  return result;
};

//Update Media details
export const updateMediaIntoDB = async (id: string, payload: Partial<any>) => {
  const isExist = await prisma.media.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error("Media not found to update!");
  }

  const result = await prisma.media.update({
    where: { id },
    data: payload,
  });

  return result;
};

// Soft Delete Media (adding Deleted at timestamp)
export const softDeleteMediaFromDB = async (id: string) => {
  const isExist = await prisma.media.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error("Media not found to delete!");
  }

  const result = await prisma.media.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return result;
};

// Restore soft deleted media
export const restoreMediaFromDB = async (id: string) => {
  const isExist = await prisma.media.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error("Media not found to restore!");
  }

  const result = await prisma.media.update({
    where: { id },
    data: { deletedAt: null },
  });

  return result;
};
