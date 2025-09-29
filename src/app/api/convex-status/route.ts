export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Convex setup is complete",
      instructions: "Use client-side components with Convex hooks to interact with the database"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}