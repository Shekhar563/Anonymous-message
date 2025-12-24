import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  authorType: "user" | "guest";
  authorUserId?: mongoose.Types.ObjectId;
  authorName?: string; // for guest
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    authorType: { type: String, enum: ["user", "guest"], required: true },
    authorUserId: { type: Schema.Types.ObjectId, ref: "User" },
    authorName: { type: String, trim: true },

    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
