import mongoose, {
  Schema,
  Document as MongooseDocument,
  Model,
} from "mongoose";

export interface IInvitation extends MongooseDocument {
  email: string;
  role: string;
  organization: mongoose.Types.ObjectId;
  isAccepted: boolean;
}

export const invitationSchema: Schema<IInvitation> = new mongoose.Schema(
  {
    email: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], required: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Invitation: Model<IInvitation> = mongoose.model<IInvitation>(
  "Invitation",
  invitationSchema,
);

export default Invitation;
