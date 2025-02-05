import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

enum UserStatus {
  ONLINE = "online",
  AWAY = "away",
  BUSY = "busy",
  OFFLINE = "offline",
}
export interface IUser extends Document {
  username: string;
  email: string;
  image: string;
  role: string;
  status: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false }, // URL of the profile photo
    role: { type: String, required: true, unique: true },
    status: { type: String, enum: Object.values(UserStatus), required: false },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
