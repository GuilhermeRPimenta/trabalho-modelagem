import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const userDir = path.join(uploadDir, "users");
const animalDir = path.join(uploadDir, "animals");
const institutionDir = path.join(uploadDir, "institutions");
if (!fs.existsSync(userDir)) {
  fs.mkdirSync(userDir);
}

if (!fs.existsSync(animalDir)) {
  fs.mkdirSync(animalDir);
}

if (!fs.existsSync(institutionDir)) {
  fs.mkdirSync(institutionDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
    let targetDir = userDir;
    if (category === "animal") {
      targetDir = animalDir;
    } else if (category === "institution") {
      targetDir = institutionDir;
    }

    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

export { upload, uploadDir };
