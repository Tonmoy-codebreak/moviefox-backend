import express from "express";
import authRoutes from "./modules/auth/auth.route";

const app: express.Application = express();

app.use(express.json());

// Auth Routes যুক্ত করা হলো
app.use("/api/v1/auth", authRoutes);

export default app;
