import express from "express";
import authRoutes from "./modules/auth/auth.route";
import mediaRoutes from "./modules/media/media.route";
import genreRoutes from "./modules/genre/genre.route";
import reviewRoutes from "./modules/review/review.route";
import completedMediaRoutes from "./modules/completedmedia/completedmedia.route";
import watchlistRoutes from "./modules/watchlist/watchlist.route";
import cors from "cors";
const app: express.Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

// Auth Routes
app.use("/api/v1/auth", authRoutes);

// Media Routes
app.use("/api/v1/media", mediaRoutes);

// Genre Routes
app.use("/api/v1/genre", genreRoutes);

// Review Routes
app.use("/api/v1/review", reviewRoutes);

// Completed Media Routes
app.use("/api/v1/completedmedia", completedMediaRoutes);

// Watchlist Routes
app.use("/api/v1/watchlist", watchlistRoutes);

export default app;
