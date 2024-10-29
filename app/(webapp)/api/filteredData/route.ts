import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodbzaid";

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

// Define the FilterConditions type
type FilterConditions = {
  keywords?: { $in: RegExp[] };
  "tier.price"?: { $gte?: number; $lte?: number };
  "tier.deliveryTime"?: { $lte?: number };
  sellerDetails?: { $in: string[] };
  reviews?: { $gte: number };
};

export async function POST(request: Request) {
  try {
    const db = await connectMongo();
    const { skill, minPrice, maxPrice, deliveryTime, sellerDetails, reviews } =
      await request.json();

    const filters: FilterConditions = {};

    if (skill) {
      const words = skill
        .split(" ")
        .map((word: string) => word.trim())
        .filter((word: string) => word.length > 0);
      const regexPattern = words
        .map((word: string) => `(?=.*${word})`)
        .join("");
      filters.keywords = { $in: [new RegExp(regexPattern, "i")] }; // Case-insensitive
    }

    if (minPrice) {
      filters["tier.price"] = { $gte: minPrice }; // Minimum price filter
    }

    if (maxPrice) {
      filters["tier.price"] = { ...filters["tier.price"], $lte: maxPrice }; // Maximum price filter
    }

    if (deliveryTime) {
      filters["tier.deliveryTime"] = { $lte: deliveryTime }; // Delivery time filter
    }

    if (sellerDetails) {
      filters.sellerDetails = { $in: sellerDetails }; // Seller details filter
    }

    if (reviews !== undefined) {
      filters.reviews = { $gte: reviews }; // Reviews filter
    }

    // Log the constructed query for debugging
    console.log("Database Query:", filters);

    const filteredGigs = await db.collection("gigs").find(filters).toArray();
    return NextResponse.json(filteredGigs);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to apply filters" },
      { status: 500 }
    );
  }
}
