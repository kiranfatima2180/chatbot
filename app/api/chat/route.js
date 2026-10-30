import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const messages = Array.isArray(body.messages)
      ? body.messages
      : [];

    if (!process.env.XAI_API_KEY) {
      return Response.json(
        {
          error:
            "XAI_API_KEY is not configured. Add your Grok API key to Vercel Environment Variables."
        },
        { status: 500 }
      );
    }

    const cleanMessages = messages
      .filter(
        (message) =>
          message &&
          ["user", "assistant"].includes(message.role)
      )
      .map((message) => ({
        role: message.role,
        content: String(message.content || "").slice(0, 12000)
      }))
      .slice(-30);

    if (!cleanMessages.length) {
      return Response.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
      timeout: 120000
    });

    const response = await client.responses.create({
      model: process.env.XAI_MODEL || "grok-4.7",

      input: [
        {
          role: "system",
          content:
            "You are Grok, a helpful, intelligent and conversational AI assistant. " +
            "Give accurate, useful and natural answers. " +
            "When the user is a beginner, explain things simply and step by step. " +
            "Do not claim to have performed actions you cannot actually perform."
        },
        ...cleanMessages
      ],

      temperature: 0.7,
      prompt_cache_key: "grok-chatbot"
    });

    return Response.json({
      content:
        response.output_text ||
        "I couldn't generate a response."
    });
  } catch (error) {
    console.error("Grok API error:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "The Grok API request failed."
      },
      { status: 500 }
    );
  }
}