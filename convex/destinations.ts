import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDestination = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.string(),
    category: v.union(
      v.literal("BEACH"),
      v.literal("MOUNTAIN"),
      v.literal("HERITAGE"),
      v.literal("ADVENTURE"),
      v.literal("CITY")
    ),
    location: v.object({
      lat: v.number(),
      lng: v.number(),
      address: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const destinationId = await ctx.db.insert("destinations", {
      ...args,
      rating: 0,
      reviewCount: 0,
      featured: false,
      createdAt: now,
    });
    
    return destinationId;
  },
});

export const getDestinationById = query({
  args: {
    id: v.id("destinations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAllDestinations = query({
  handler: async (ctx) => {
    return await ctx.db.query("destinations").collect();
  },
});

export const getDestinationsByCategory = query({
  args: {
    category: v.union(
      v.literal("BEACH"),
      v.literal("MOUNTAIN"),
      v.literal("HERITAGE"),
      v.literal("ADVENTURE"),
      v.literal("CITY")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_category", q => q.eq("category", args.category))
      .collect();
  },
});

export const updateDestination = mutation({
  args: {
    id: v.id("destinations"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    category: v.optional(
      v.union(
        v.literal("BEACH"),
        v.literal("MOUNTAIN"),
        v.literal("HERITAGE"),
        v.literal("ADVENTURE"),
        v.literal("CITY")
      )
    ),
    location: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
        address: v.string(),
      })
    ),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, updates);
    
    return await ctx.db.get(id);
  },
});