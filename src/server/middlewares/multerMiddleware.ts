import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const randomPrefix = uuidv4;

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, `${randomPrefix()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const avatar = upload.single("avatar");

export default avatar;
