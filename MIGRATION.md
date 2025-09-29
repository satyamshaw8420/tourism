# Migration from Prisma/MongoDB to Convex

This document explains how to migrate from the existing Prisma/MongoDB setup to Convex.

## Current State

The project currently uses:
- Prisma as the ORM
- MongoDB as the database
- Prisma Client for database operations

## New State with Convex

The project now also supports:
- Convex as the backend/database
- Convex functions for data operations
- Real-time subscriptions

## Migration Steps

### 1. Schema Migration

The Prisma schema has been converted to Convex schema:
- File: [convex/schema.ts](convex/schema.ts)
- All models from Prisma have been converted to Convex tables
- Relationships are maintained through ID references

### 2. Function Migration

Prisma operations have been converted to Convex functions:
- File: [convex/users.ts](convex/users.ts) - User operations
- File: [convex/destinations.ts](convex/destinations.ts) - Destination operations
- File: [convex/tours.ts](convex/tours.ts) - Tour operations
- File: [convex/groups.ts](convex/groups.ts) - Group operations
- File: [convex/bookings.ts](convex/bookings.ts) - Booking operations

### 3. Frontend Integration

The frontend can now use Convex hooks:
- File: [src/hooks/useUsers.ts](src/hooks/useUsers.ts) - User hooks
- Components can use `useQuery` and `useMutation` from Convex

### 4. Testing

Test pages have been created:
- [src/app/convex-test/page.tsx](src/app/convex-test/page.tsx) - Test Convex integration
- [src/app/test-convex/page.tsx](src/app/test-convex/page.tsx) - Another test page

## Gradual Migration Approach

You can gradually migrate from Prisma to Convex:

1. **Dual writes**: Write to both databases during transition
2. **Read from Convex**: Start reading from Convex while writing to both
3. **Complete migration**: Remove Prisma code once all data is migrated

## Environment Variables

Update your environment variables:
- Remove `DATABASE_URL` (if not needed for other purposes)
- Add `NEXT_PUBLIC_CONVEX_URL` with your Convex deployment URL

## Deployment

To deploy with Convex:
1. Run `npx convex deploy` to deploy your Convex functions
2. Deploy your Next.js app as usual
3. Make sure environment variables are set correctly

## Benefits of Convex

1. **Real-time**: Built-in real-time subscriptions
2. **Serverless**: No need to manage database servers
3. **Type-safe**: Full TypeScript support
4. **Easy deployment**: Single command deployment
5. **Built-in caching**: Automatic caching and optimization