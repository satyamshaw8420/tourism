import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.email))
      .unique();
      
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      password: args.password,
      avatar: args.avatar,
      phone: args.phone,
      kycStatus: "PENDING",
      createdAt: now,
      updatedAt: now,
    });
    
    return userId;
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.email))
      .unique();
  },
});

export const getUserById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
    kycStatus: v.optional(
      v.union(
        v.literal("PENDING"),
        v.literal("VERIFIED"),
        v.literal("REJECTED")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });
    
    return await ctx.db.get(id);
  },
});