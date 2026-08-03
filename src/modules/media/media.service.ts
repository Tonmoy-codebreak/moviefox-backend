import prisma from "../../lib/prisma.js";

// Create Media
export const createMediaIntoDB = async (payload: any) => {
  const result = await prisma.media.create({
    data: payload,
  });

  return result;
};
