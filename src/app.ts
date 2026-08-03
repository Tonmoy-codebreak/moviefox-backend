import express from "express";
import authRoutes from "./modules/auth/auth.route";
import mediaRoutes from "./modules/media/media.route";

const app: express.Application = express();

app.use(express.json());

// Auth Routes
app.use("/api/v1/auth", authRoutes);

// Media Routes
app.use("/api/v1/media", mediaRoutes);

export default app;
