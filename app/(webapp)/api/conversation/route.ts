import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("GIGO");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

// Handle GET requests
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    console.log("Request received for User ID:", userId); // Log the userId

    const db = await connectToDatabase();
    console.log("Database connected successfully");

    // Fetch conversations where the userId exists in the participants array
    const conversations = await db
      .collection("conversation")
      .find({ participants: { $in: [userId] } })
      .toArray();

    console.log("Fetched Conversations:", conversations); // Log the fetched conversations

    // Check if the user has any conversations
    if (conversations.length === 0) {
      console.log("No conversations found for this user.");
      return NextResponse.json({ message: "No conversations found for this user" }, { status: 404 });
    }

    // Extract other participants (not the current user) from each conversation
    const otherParticipants = new Set(
      conversations.flatMap((conversation) =>
        conversation.participants.filter((participantId: string) => participantId !== userId)
      )
    );

    console.log("Other Participants:", Array.from(otherParticipants)); // Log the other participants

    // If there are no other participants, return a message
    if (otherParticipants.size === 0) {
      console.log("No participants found in conversations for this user.");
      return NextResponse.json({ message: "No participants found in conversations for this user" }, { status: 404 });
    }

    // Return the list of unique participants
    return NextResponse.json(Array.from(otherParticipants), { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
