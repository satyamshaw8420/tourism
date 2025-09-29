# Testing Convex Integration

This document explains how to test the Convex database integration.

## Prerequisites

1. Make sure both Convex and Next.js servers are running:
   - Convex: `npx convex dev`
   - Next.js: `npm run dev`

2. Ensure environment variables are set correctly in `.env`:
   - `NEXT_PUBLIC_CONVEX_URL` should point to your Convex deployment

## Test Pages

There are two test pages available:

1. **Convex Test Page**: [http://localhost:3000/convex-test](http://localhost:3000/convex-test)
   - This page allows you to create users and test the Convex integration
   - You can see real-time updates when querying users

2. **Test Convex Page**: [http://localhost:3000/test-convex](http://localhost:3000/test-convex)
   - This is a simpler test page for Convex functionality

## Testing Steps

1. Visit [http://localhost:3000/convex-test](http://localhost:3000/convex-test) in your browser

2. Fill in the form with:
   - Name: Any name
   - Email: A unique email address
   - Password: Any password

3. Click "Create User"

4. If successful, you should see:
   - A success message
   - The created user's information displayed below the form

5. Try creating another user with the same email - you should see an error message

## API Testing

You can also test the API endpoint:

```bash
curl http://localhost:3000/api/test-convex
```

This should return a JSON response indicating that the Convex setup is complete.

## Troubleshooting

### Common Issues

1. **"Context only works in Client Components" error**
   - Make sure to add `"use client"` directive to client-side components
   - Don't use Convex client hooks in server components

2. **"Unable to connect to the remote server"**
   - Make sure the Convex dev server is running (`npx convex dev`)
   - Check that the `NEXT_PUBLIC_CONVEX_URL` is correct

3. **TypeScript errors in hooks**
   - Make sure the Convex generated files exist in `convex/_generated/`
   - Run `npx convex dev` to regenerate them if needed

### Checking Convex Status

To check if Convex is running correctly:

```bash
npx convex dev --once
```

This should show that your functions are ready.

### Viewing Data

You can view your data in the Convex dashboard:

```bash
npx convex dashboard
```

This will open the Convex dashboard in your browser where you can:
- View your data tables
- Run queries
- Monitor function performance