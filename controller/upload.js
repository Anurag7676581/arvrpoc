const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.ACKEY,
  secretAccessKey: process.env.AC_SECRET,
  region: "ap-south-1",
});

const uploadFile = async (req, res, fileType) => {
  try {
    const file = req.file;
    const filename = req.body.name;

    if (!file || !file.buffer) {
      return res.status(400).send("No file uploaded or file buffer is empty.");
    }

    let key;
    let contentType;

    if (fileType === "glb") {
      key = `models/${filename}.glb`;
      contentType = "model/gltf-binary";
    } else if (fileType === "mp3") {
      key = `audio-files/${filename}.mp3`;
      contentType = "audio/mpeg";
    } else {
      return res.status(400).send("Invalid file type.");
    }

    const params = {
      Bucket: "arvrpocheybuddy",
      Key: key,
      Body: file.buffer,
      ContentType: contentType,
    };

    const uploadResult = await s3.upload(params).promise();

    const response = {
      uploadResult,
      downloadUrl: uploadResult.Location,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("Error uploading file to S3.");
  }
};

const checkNameValidity = async (req, res) => {
  const nameToCheck = `${req.params.name}.glb`;
  try {
    const headObjectParams = {
      Bucket: "arvrpocheybuddy",
      Key: `models/${nameToCheck}`,
    };
    try {
      await s3.headObject(headObjectParams).promise();
      return res
        .status(200)
        .json({ valid: false, message: "Name is not unique." });
    } catch (headObjectError) {
      if (headObjectError.code === "NotFound") {
        return res
          .status(200)
          .json({ valid: true, message: "Name is unique." });
      }
      throw headObjectError;
    }
  } catch (error) {
    console.error("Error checking name validity:", error);
    res.status(500).send("Error checking name validity.");
  }
};

module.exports = { uploadFile, checkNameValidity };
