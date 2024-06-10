import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
  },
});

export const uploads = multer({ storage: storage });
