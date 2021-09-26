import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    content: { type: Array },
    listURL: { type: String },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

export default List;
