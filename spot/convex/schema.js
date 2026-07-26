import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    //users table
    users:defineTable({
        name: v.string(),
  tokenIdentifier: v.string(),//clerk user id for auth
  email:v.string(),
  imageUrl:v.optional(v.string()),
  //to chek if user onboarded or not
  hasCompletedOnboarding: v.boolean(),
  location:v.optional(
    v.object({
       city:v.string(),
       state:v.optional(v.string()),
       country:v.string(), 
    })
  ),
  interests:v.optional(v.array(v.string())), //min intrests=3
//to track user subscriptions
   freeEventsCreated:v.number(),//free event limit=1
   //timestamps
   createdAt:v.number(),
   updatedAt:v.number(),


    }).index("by_token",["tokenIdentifier"]),
});