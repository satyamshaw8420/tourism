import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGroup = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    creatorId: v.id("users"),
    tourId: v.optional(v.id("tours")),
    maxMembers: v.number(),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const groupId = await ctx.db.insert("groups", {
      ...args,
      status: "PLANNING",
      createdAt: now,
      updatedAt: now,
    });
    
    // Create group wallet
    await ctx.db.insert("groupWallets", {
      groupId,
      balance: 0,
      targetAmount: 0,
      createdAt: now,
    });
    
    // Add creator as admin member
    await ctx.db.insert("groupMembers", {
      userId: args.creatorId,
      groupId,
      role: "ADMIN",
      contribution: 0,
      joinedAt: now,
      status: "ACCEPTED",
    });
    
    return groupId;
  },
});

export const getGroupById = query({
  args: {
    id: v.id("groups"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getGroupsByCreator = query({
  args: {
    creatorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_creator", q => q.eq("creatorId", args.creatorId))
      .collect();
  },
});

export const getAllGroups = query({
  handler: async (ctx) => {
    return await ctx.db.query("groups").collect();
  },
});

export const updateGroup = mutation({
  args: {
    id: v.id("groups"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    tourId: v.optional(v.id("tours")),
    status: v.optional(
      v.union(
        v.literal("PLANNING"),
        v.literal("ACTIVE"),
        v.literal("COMPLETED"),
        v.literal("CANCELLED")
      )
    ),
    maxMembers: v.optional(v.number()),
    isPublic: v.optional(v.boolean()),
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

export const addGroupMember = mutation({
  args: {
    groupId: v.id("groups"),
    userId: v.id("users"),
    role: v.union(v.literal("ADMIN"), v.literal("MEMBER")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const memberExists = await ctx.db
      .query("groupMembers")
      .withIndex("by_user_group", q => 
        q.eq("userId", args.userId).eq("groupId", args.groupId)
      )
      .unique();
      
    if (memberExists) {
      throw new Error("User is already a member of this group");
    }
    
    const memberId = await ctx.db.insert("groupMembers", {
      ...args,
      contribution: 0,
      joinedAt: now,
      status: "PENDING",
    });
    
    return memberId;
  },
});

export const getGroupMembers = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groupMembers")
      .withIndex("by_group", q => q.eq("groupId", args.groupId))
      .collect();
  },
});