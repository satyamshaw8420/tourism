# Convex Database Setup

This project uses Convex as its database backend. Here's how to set it up and use it.

## Setup

1. Make sure you have the Convex CLI installed:
   ```bash
   npm install convex
   ```

2. Initialize Convex in your project:
   ```bash
   npx convex dev
   ```

3. This will create a new Convex project and generate the necessary configuration files.

## Project Structure

```
convex/
├── schema.ts          # Database schema definition
├── users.ts           # User-related functions
├── destinations.ts    # Destination-related functions
├── tours.ts           # Tour package functions
├── groups.ts          # Group management functions
├── bookings.ts        # Booking functions
└── _generated/        # Auto-generated files
```

## Schema

The schema is defined in [schema.ts](schema.ts) and includes tables for:
- Users
- Destinations
- Tour packages
- Groups
- Group members
- Group wallets
- Transactions
- Bookings

## Functions

Each module (users, destinations, etc.) contains:
- Queries (for reading data)
- Mutations (for writing data)

### Example Usage

```typescript
// Creating a user
const userId = await mutation(ctx => {
  return ctx.db.insert("users", {
    email: "user@example.com",
    name: "John Doe",
    password: "hashed_password",
    kycStatus: "PENDING",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
});

// Querying a user
const user = await query(ctx => {
  return ctx.db.query("users")
    .withIndex("by_email", q => q.eq("email", "user@example.com"))
    .unique();
});
```

## Frontend Integration

In your React components, you can use the provided hooks:

```typescript
import { useCreateUser, useGetUserByEmail } from '@/hooks/useUsers';

export default function MyComponent() {
  const createUser = useCreateUser();
  const user = useGetUserByEmail("user@example.com");
  
  // Use the functions...
}
```

## Environment Variables

Make sure to set the following environment variables:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

You can get your Convex URL by running:
```bash
npx convex dev
```

## Development

To start the Convex development server:
```bash
npx convex dev
```

This will watch for changes and automatically deploy your functions to your development deployment.

## Deployment

To deploy to production:
```bash
npx convex deploy
```