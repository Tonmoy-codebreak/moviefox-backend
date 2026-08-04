import { Router, type IRouter } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { WatchlistValidation } from "./watchlist.validation";
import { WatchlistController } from "./watchlist.controller";

const router: IRouter = Router();

// Add media to watchlist
router.post(
  "/",
  authMiddleware("USER", "ADMIN"),
  validateRequest(WatchlistValidation.createWatchlistValidation),
  WatchlistController.addToWatchlist,
);

// Get logged-in user's watchlist
router.get(
  "/my-watchlist",
  authMiddleware("USER", "ADMIN"),
  WatchlistController.getMyWatchlist,
);

// Remove media from watchlist
router.delete(
  "/:id",
  authMiddleware("USER", "ADMIN"),
  WatchlistController.removeFromWatchlist,
);

// Get watchlist count for a specific media

export default router;
