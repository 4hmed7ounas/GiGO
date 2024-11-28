import clientPromise from "../../../../lib/mongodb";

const connectMongo = async () => {
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
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required." }), { status: 400 });
  }

  try {
    const db = await connectMongo();
    const messagesCollection = db.collection("messages");

    // Fetch messages where user is either sender or receiver
    const messages = await messagesCollection
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .sort({ timestamp: -1 }) // Sort by most recent
      .toArray();

    return new Response(JSON.stringify({ success: true, messages }), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch messages." }), { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { senderId, receiverId, message, senderRole, receiverRole } = body;

  if (!senderId || !receiverId || !message || !senderRole || !receiverRole) {
    return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
  }

  // Validate roles: Buyers and freelancers cannot message each other
  if (
    (senderRole === "buyer" && receiverRole === "freelancer") ||
    (senderRole === "freelancer" && receiverRole === "buyer")
  ) {
    return new Response(
      JSON.stringify({ error: "Buyers and freelancers cannot message each other." }),
      { status: 400 }
    );
  }

  try {
    const db = await connectMongo();
    const messagesCollection = db.collection("messages");

    // Save message to the database
    const newMessage = {
      senderId,
      receiverId,
      message,
      senderRole,
      receiverRole,
      timestamp: new Date(), // Add a timestamp
    };

    const result = await messagesCollection.insertOne(newMessage);

    if (result.acknowledged) {
      return new Response(JSON.stringify({ success: "Message sent successfully." }), { status: 201 });
    } else {
      throw new Error("Failed to save the message.");
    }
  } catch (error) {
    console.error("Error saving message:", error);
    return new Response(JSON.stringify({ error: "Failed to send message." }), { status: 500 });
  }
}
