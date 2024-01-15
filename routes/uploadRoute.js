const express = require("express");
const multer = require("multer");
const uploadController = require("../controller/upload");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/model", upload.single("model"), (req, res) => {
  const fileExtension = getFileExtension(req.file);
  console.log("File extension:", fileExtension);
  uploadController.uploadFile(req, res, fileExtension);
});

function getFileExtension(file) {
  const originalname = file.originalname || "";
  const mimetype = file.mimetype || "";
  const originalExtension = originalname.slice(
    ((originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  return originalExtension || mimetype.split("/")[1] || "";
}

router.post("/audio", upload.single("audio"), (req, res) => {
  uploadController.uploadFile(req, res, "mp3");
});

module.exports = router;
