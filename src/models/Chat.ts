import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IChat extends Document {
    room: mongoose.Types.ObjectId;
    content: string;
    sender: string;
    user: mongoose.Types.ObjectId;
}

const chatSchema: Schema<IChat> = new mongoose.Schema({
    sender: { type: String, required: true,  },
    content: { type: String, required: true,  },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Chat: Model<IChat> = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;
