import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IChat extends Document {
  chatRoomId: mongoose.Types.ObjectId;
  //   content: string;
  //   sender: string;
  //   userId: mongoose.Types.ObjectId;
  users: { user: mongoose.Types.ObjectId; bot: string }[];
  messages: {
    sender: string;
    content: string;
    timestamp: Date;
    type: string;
  }[];
}

const chatSchema: Schema<IChat> = new mongoose.Schema(
  {
    // sender: { type: String, required: true },
    // content: { type: String, required: true },
    chatRoomId: { type: mongoose.Schema.Types.ObjectId },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   //   required: true,
    // },
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        bot: { type: String },
      },
    ],
    messages: [
      {
        sender: { type: String, required: true },
        content: { type: String, required: true },
        type: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Chat: Model<IChat> = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;