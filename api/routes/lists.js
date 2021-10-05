import express from "express";
import List from "../models/List.js";
import verify from "../verifyToken.js";

const router = express.Router();

//GET ONE LIST BY TITLE
router.get("/single/:id", async (req, res) => {
  try {
    const userList = await List.find({ title: req.params.id });
    res.send(userList);
  } catch (error) {
    res.status(404).json(err);
  }
});

//GET ALL LISTS BY USERNAME - id = username
router.get("/:id", async (req, res) => {
  try {
    const userLists = await List.find({ username: req.params.id });
    res.send(userLists);
  } catch (error) {
    res.status(404).json(err);
  }
});

//CREATE body{title, username, }
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

//ADD SONG TO LIST id = listTitle - send PATCH request with body{songURL}
router.patch("/addto/:id", verify, async (req, res) => {
  try {
    await List.updateOne(
      { title: req.params.id },
      {
        $push: { content: req.body.songURL },
      }
    );
    res.status(201).json("The song has been added to the list");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REMOVE SONG FROM LIST id = listTitle - send PATCH request with body{songURL}
router.patch("/removefrom/:id", verify, async (req, res) => {
  try {
    await List.updateOne(
      { title: req.params.id },
      {
        content: content.filter((song) => song !== req.body.songURL),
      }
    );
    res.status(204).json("The song has been removed from the list");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
