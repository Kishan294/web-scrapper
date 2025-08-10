import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { clerkId: ctx.auth.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
  }),

  createOrUpdateUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.upsert({
        where: { clerkId: ctx.auth.userId },
        update: {
          ...input,
          updatedAt: new Date(),
        },
        create: {
          clerkId: ctx.auth.userId,
          ...input,
        },
      });

      return user;
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { clerkId: ctx.auth.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const [totalJobs, completedJobs, failedJobs, totalResults] =
      await Promise.all([
        ctx.db.scrapeJob.count({ where: { userId: user.id } }),
        ctx.db.scrapeJob.count({
          where: { userId: user.id, status: "completed" },
        }),
        ctx.db.scrapeJob.count({
          where: { userId: user.id, status: "failed" },
        }),
        ctx.db.scrapeResult.count({
          where: { job: { userId: user.id } },
        }),
      ]);

    return {
      totalJobs,
      completedJobs,
      failedJobs,
      totalResults,
    };
  }),
});
