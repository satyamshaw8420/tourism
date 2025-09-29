import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    userId: v.id("users"),
    tourId: v.id("tours"),
    groupId: v.optional(v.id("groups")),
    travelers: v.array(
      v.object({
        name: v.string(),
        age: v.number(),
        gender: v.string(),
        idType: v.string(),
        idNumber: v.string(),
      })
    ),
    totalAmount: v.number(),
    travelDate: v.number(),
    specialRequests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      paidAmount: 0,
      paymentStatus: "PENDING",
      bookingStatus: "PENDING",
      createdAt: now,
    });
    
    return bookingId;
  },
});

export const getBookingById = query({
  args: {
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBookingsByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .collect();
  },
});

export const getBookingsByTour = query({
  args: {
    tourId: v.id("tours"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_tour", q => q.eq("tourId", args.tourId))
      .collect();
  },
});

export const updateBooking = mutation({
  args: {
    id: v.id("bookings"),
    paidAmount: v.optional(v.number()),
    paymentStatus: v.optional(
      v.union(
        v.literal("PENDING"),
        v.literal("PARTIAL"),
        v.literal("COMPLETED")
      )
    ),
    bookingStatus: v.optional(
      v.union(
        v.literal("PENDING"),
        v.literal("CONFIRMED"),
        v.literal("CANCELLED")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, updates);
    
    return await ctx.db.get(id);
  },
});