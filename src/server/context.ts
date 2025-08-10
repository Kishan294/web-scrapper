import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const createTRPCContext = async () => {
  const authData = await auth();

  return {
    db,
    auth: authData,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
