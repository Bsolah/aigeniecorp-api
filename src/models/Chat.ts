import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChat extends Document {
  chatRoomId: mongoose.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  content: string;
  prompts?: string[];
  type: string;
  attachments: string;
  timestamp: Date;
}

const chatSchema: Schema<IChat> = new mongoose.Schema(
  {
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    prompts: [{ type: String }],
    type: { type: String, required: true },
    attachments: { type: String },
  },
  { timestamps: true },
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;
