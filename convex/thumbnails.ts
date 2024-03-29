import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createThumbnail = mutation({
  args: {
    title: v.string(),
    aImage: v.string(),
    bImage: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("User must be logged in");

    await ctx.db.insert("thumbnails", {
      title: args.title,
      userId: user.subject,
      aImage: args.aImage,
      bImage: args.bImage,
    });
  },
});

export const getThumbnails = mutation({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("User must be logged in");

    return await ctx.db
      .query("thumbnails")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .collect();
  },
});
