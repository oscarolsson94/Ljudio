import express from "express";
import List from "../models/List.js";
import verify from "../verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verify, async (req, res) => {
  const newList = new List(req.body);
  try {
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(204).json("The list has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD SONG TO LIST id = listTitle - send body{songURL}
router.patch("/addto/:id", verify, async (req, res) => {
  try {
    await List.updateOne(
      { title: req.params.id },
      {
        content: [...content, songURL],
      }
    );
    res.status(201).json("The song has been added to the list");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REMOVE SONG FROM LIST id = listTitle - send body{songURL}
router.patch("/removefrom/:id", verify, async (req, res) => {
  try {
    await List.updateOne(
      { title: req.params.id },
      {
        content: content.filter((song) => song !== songURL),
      }
    );
    res.status(204).json("The song has been removed from the list");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
