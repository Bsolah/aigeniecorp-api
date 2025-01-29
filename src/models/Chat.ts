import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IChat extends Document {
    chatRoomId: mongoose.Types.ObjectId;
    content: string;
    sender: string;
    userId: mongoose.Types.ObjectId;
}

const chatSchema: Schema<IChat> = new mongoose.Schema({
    sender: { type: String, required: true, },
    content: { type: String, required: true, },
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Chat: Model<IChat> = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;