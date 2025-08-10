import { createTRPCRouter } from "../trpc";
import { scraperRouter } from "./scraper";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  scraper: scraperRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
