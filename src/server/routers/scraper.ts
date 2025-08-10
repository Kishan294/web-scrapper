import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import * as cheerio from "cheerio";

const createScrapeJobSchema = z.object({
  url: z.string().url(),
  selector: z.string().optional(),
  xpath: z.string().optional(),
  frequency: z.enum(["once", "daily", "weekly", "monthly"]),
  format: z.enum(["json", "csv", "html"]),
  name: z.string().optional(),
  description: z.string().optional(),
});

export const scraperRouter = createTRPCRouter({
  createJob: protectedProcedure
    .input(createScrapeJobSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.auth.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const job = await ctx.db.scrapeJob.create({
        data: {
          ...input,
          userId: user.id,
        },
      });

      return job;
    }),

  getJobs: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { clerkId: ctx.auth.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return ctx.db.scrapeJob.findMany({
      where: { userId: user.id },
      include: {
        results: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  getJob: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.auth.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const job = await ctx.db.scrapeJob.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
        include: {
          results: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }

      return job;
    }),

  runJob: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.auth.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const job = await ctx.db.scrapeJob.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }

      try {
        // Update job status to running
        await ctx.db.scrapeJob.update({
          where: { id: job.id },
          data: { status: "running", lastRunAt: new Date() },
        });

        // Perform the scraping
        const response = await axios.get(job.url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          timeout: 30000,
        });

        const $ = cheerio.load(response.data);
        let scrapedData: any[] = [];

        if (job.selector) {
          $(job.selector).each((i, element) => {
            scrapedData.push({
              text: $(element).text().trim(),
              html: $(element).html(),
              attributes: $(element).attr(),
            });
          });
        } else {
          // Default scraping - get all text content
          scrapedData = [
            {
              title: $("title").text(),
              text: $("body").text().trim().substring(0, 1000),
              url: job.url,
            },
          ];
        }

        // Save the result
        const result = await ctx.db.scrapeResult.create({
          data: {
            jobId: job.id,
            data: scrapedData,
            status: "success",
            itemCount: scrapedData.length,
          },
        });

        // Update job status to completed
        await ctx.db.scrapeJob.update({
          where: { id: job.id },
          data: { status: "completed" },
        });

        return result;
      } catch (error) {
        // Save error result
        await ctx.db.scrapeResult.create({
          data: {
            jobId: job.id,
            data: {},
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
            itemCount: 0,
          },
        });

        // Update job status to failed
        await ctx.db.scrapeJob.update({
          where: { id: job.id },
          data: { status: "failed" },
        });

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Scraping failed",
          cause: error,
        });
      }
    }),

  deleteJob: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: ctx.auth.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const job = await ctx.db.scrapeJob.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }

      await ctx.db.scrapeJob.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
