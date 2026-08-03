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

// Get Single Genre details from DB
const getSingleGenreFromDB = async (id: string) => {
  const result = await prisma.genre.findUnique({
    where: {
      id,
    },
    include: {
      media: {
        include: {
          media: true,
        },
      },
    },
  });

  return result;
};

// Update existing Genre
const updateGenreIntoDB = async (id: string, payload: { name?: string }) => {
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const isGenreExists = await prisma.genre.findUnique({
    where: { id },
  });

  if (!isGenreExists) {
    throw new Error("Genre not found!");
  }

  const updateData: { name?: string; slug?: string } = {};

  if (payload.name) {
    updateData.name = payload.name;
    updateData.slug = slugify(payload.name);
  }

  const result = await prisma.genre.update({
    where: { id },
    data: updateData,
  });

  return result;
};

export const GenreService = {
  createGenreIntoDB,
  getAllGenresFromDB,
  getSingleGenreFromDB,
  updateGenreIntoDB,
};
