import { ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variables or use the default
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://localhost:3001";

export const convex = new ConvexReactClient(convexUrl);