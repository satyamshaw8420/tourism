import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTour = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    images: v.array(v.string()),
    destinationId: v.id("destinations"),
    duration: v.number(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    maxGroupSize: v.number(),
    minGroupSize: v.number(),
    inclusions: v.array(v.string()),
    exclusions: v.array(v.string()),
    itinerary: v.array(
      v.object({
        day: v.number(),
        title: v.string(),
        description: v.string(),
        activities: v.array(v.string()),
        meals: v.array(v.string()),
        accommodation: v.optional(v.string()),
      })
    ),
    availability: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const tourId = await ctx.db.insert("tours", {
      ...args,
      rating: 0,
      reviewCount: 0,
      featured: false,
      createdAt: now,
    });
    
    return tourId;
  },
});

export const getTourById = query({
  args: {
    id: v.id("tours"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getToursByDestination = query({
  args: {
    destinationId: v.id("destinations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tours")
      .filter(q => q.eq(q.field("destinationId"), args.destinationId))
      .collect();
  },
});

export const getAllTours = query({
  handler: async (ctx) => {
    return await ctx.db.query("tours").collect();
  },
});

export const updateTour = mutation({
  args: {
    id: v.id("tours"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    duration: v.optional(v.number()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    maxGroupSize: v.optional(v.number()),
    minGroupSize: v.optional(v.number()),
    inclusions: v.optional(v.array(v.string())),
    exclusions: v.optional(v.array(v.string())),
    itinerary: v.optional(
      v.array(
        v.object({
          day: v.number(),
          title: v.string(),
          description: v.string(),
          activities: v.array(v.string()),
          meals: v.array(v.string()),
          accommodation: v.optional(v.string()),
        })
      )
    ),
    availability: v.optional(v.array(v.number())),
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