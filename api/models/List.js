import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    content: [
      {
        title: { type: String },
        songId: { type: String },
        artist: { type: String },
        coverPic: { type: String },
      },
    ],
    listURL: { type: String },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

export default List;
