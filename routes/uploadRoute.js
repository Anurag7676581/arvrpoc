const express = require("express");
const multer = require("multer");
const uploadController = require("../controller/upload");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/model", upload.single("model"), (req, res) => {
  uploadController.uploadFile(req, res, "glb");
});

router.post("/audio", upload.single("audio"), (req, res) => {
  uploadController.uploadFile(req, res, "mp3");
});



module.exports = router;
