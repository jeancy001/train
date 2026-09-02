import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },

    postnom: {
      type: String,
      required: true,
      trim: true,
    },

    prenom: {
      type: String,
      required: true,
      trim: true,
    },

    // Store only Supabase Storage public URLs here
    documentUrl: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model("Posts", postSchema);