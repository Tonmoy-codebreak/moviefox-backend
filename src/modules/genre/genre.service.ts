import prisma from "../../lib/prisma.js";

// Create a new genre in database
const createGenreIntoDB = async (payload: { name: string }) => {
  const slug = payload.name
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w-]/g, "");

  const result = await prisma.genre.create({
    data: {
      name: payload.name,
      slug,
    },
  });
  return result;
};

// Get all genres from database
const getAllGenresFromDB = async () => {
  const result = await prisma.genre.findMany();
  return result;
};

export const GenreService = {
  createGenreIntoDB,
  getAllGenresFromDB,
};
