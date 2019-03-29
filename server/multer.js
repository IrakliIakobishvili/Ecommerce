const multer = require("multer");

module.exports = {
  upload: image => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function(req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        );
      }
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        req.fileValidationError = "Forbidden File Extention!";
        return cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 2
      },
      fileFilter: fileFilter
    });
    return upload.single(image);
  }
};
