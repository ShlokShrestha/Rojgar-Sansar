import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileSpaceCheck = file.originalname.replace(/ /g, "_");
    cb(null, file.fieldname + "-" + Date.now() + fileSpaceCheck);
  },
});

const checkImageFilter = (req: any, file: { mimetype: string }, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images"));
  }
};

const checkFileFilter = (req: any, file: { mimetype: string }, cb: any) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images or pdf"));
  }
};

export const uploadImageMiddleWare = multer({
  storage: storage,
  fileFilter: checkImageFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

export const uploadFilePdfMiddleWare = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});
