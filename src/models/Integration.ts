import mongoose, { Schema } from "mongoose";

export interface IIntegration extends mongoose.Document {
  googleRefreshToken: string;
  user: mongoose.Types.ObjectId;
}

const integrationSchema: Schema<IIntegration> = new mongoose.Schema({
  googleRefreshToken: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


const Integration = mongoose.model<IIntegration>("Integration", integrationSchema);
export default Integration;