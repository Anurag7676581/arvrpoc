const express = require("express");
const ArModel = require("../model/ArModel"); // Assuming your model is in the specified path

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { name, assetUrl, audioUrl } = req.body;
    if (!name || !assetUrl) {
      return res.status(400).json({ error: "Name and assetUrl are required." });
    }
    const newArModel = new ArModel({
      name,
      assetUrl,
      audioUrl,
    });

    const savedArModel = await newArModel.save();
    res.status(201).json(savedArModel);
  } catch (error) {
    console.error("Error saving AR model:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const arModel = await ArModel.findOne({ name });

    if (!arModel) {
      return res.status(404).json({ error: "AR model not found." });
    }

    res.status(200).json(arModel);
  } catch (error) {
    console.error("Error getting AR model:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
