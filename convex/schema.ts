import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.string(),
    kycStatus: v.union(
      v.literal("PENDING"),
      v.literal("VERIFIED"),
      v.literal("REJECTED")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"]),

  destinations: defineTable({
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
    rating: v.number(),
    reviewCount: v.number(),
    featured: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_category", ["category"]),

  tours: defineTable({
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
    rating: v.number(),
    reviewCount: v.number(),
    featured: v.boolean(),
    createdAt: v.number(),
  }),

  groups: defineTable({
    name: v.string(),
    description: v.string(),
    creatorId: v.id("users"),
    tourId: v.optional(v.id("tours")),
    status: v.union(
      v.literal("PLANNING"),
      v.literal("ACTIVE"),
      v.literal("COMPLETED"),
      v.literal("CANCELLED")
    ),
    maxMembers: v.number(),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_creator", ["creatorId"]),

  groupMembers: defineTable({
    userId: v.id("users"),
    groupId: v.id("groups"),
    role: v.union(v.literal("ADMIN"), v.literal("MEMBER")),
    contribution: v.number(),
    joinedAt: v.number(),
    status: v.union(
      v.literal("PENDING"),
      v.literal("ACCEPTED"),
      v.literal("DECLINED")
    ),
  })
    .index("by_user", ["userId"])
    .index("by_group", ["groupId"])
    .index("by_user_group", ["userId", "groupId"]),

  groupWallets: defineTable({
    groupId: v.id("groups"),
    balance: v.number(),
    targetAmount: v.number(),
    createdAt: v.number(),
  }).index("by_group", ["groupId"]),

  transactions: defineTable({
    amount: v.number(),
    type: v.union(
      v.literal("DEPOSIT"),
      v.literal("WITHDRAWAL"),
      v.literal("PAYMENT"),
      v.literal("REFUND")
    ),
    description: v.string(),
    userId: v.id("users"),
    groupId: v.optional(v.id("groups")),
    walletId: v.optional(v.id("groupWallets")),
    status: v.union(
      v.literal("PENDING"),
      v.literal("COMPLETED"),
      v.literal("FAILED")
    ),
    paymentMethod: v.union(
      v.literal("UPI"),
      v.literal("CARD"),
      v.literal("WALLET"),
      v.literal("EMI")
    ),
    razorpayId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_group", ["groupId"]),

  bookings: defineTable({
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
    paidAmount: v.number(),
    paymentStatus: v.union(
      v.literal("PENDING"),
      v.literal("PARTIAL"),
      v.literal("COMPLETED")
    ),
    bookingStatus: v.union(
      v.literal("PENDING"),
      v.literal("CONFIRMED"),
      v.literal("CANCELLED")
    ),
    specialRequests: v.optional(v.string()),
    travelDate: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_tour", ["tourId"]),
});