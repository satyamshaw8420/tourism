import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function GET() {
  try {
    // Test the OpenAI API with a simple prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful travel assistant." },
        { role: "user", content: "What are the top 3 beach destinations in India?" }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const responseText = completion.choices[0].message.content || "No response from AI";

    return NextResponse.json({
      success: true,
      message: responseText
    });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}