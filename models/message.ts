import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  senderId: string;        // User ID of the sender
  receiverId: string;      // User ID of the receiver
  message: string;         // The message content
  timestamp: Date;         // When the message was sent
  senderRole: string;      // Role of the sender ("buyer" or "freelancer")
  receiverRole: string;    // Role of the receiver ("buyer" or "freelancer")
}

const messageSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  senderRole: { type: String, required: true },
  receiverRole: { type: String, required: true },
});

// Use existing model or create a new one
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
