import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Store user after authentication
export const store = mutation({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if user already exists
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // Update name if changed
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          updatedAt: Date.now(),
        });
      }

      return user._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      imageUrl: identity.pictureUrl,

      hasCompletedOnboarding: false,
      freeEventsCreated: 0,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});


// Get currently logged-in user
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log("Current Identity:", identity);

    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    console.log("Found User:", user);

    return user;
  },
});


// Complete onboarding
export const completeOnboarding = mutation({
  args: {
    location: v.object({
      city: v.string(),
      state: v.optional(v.string()),
      country: v.string(),
    }),

    interests: v.array(v.string()),
  },


  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User is not authenticated");
    }


    // Find current user directly
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();


    if (!user) {
      throw new Error("User not found");
    }


    // Update onboarding details
    await ctx.db.patch(user._id, {
      location: args.location,
      interests: args.interests,

      hasCompletedOnboarding: true,

      updatedAt: Date.now(),
    });


    return user._id;
  },
});
