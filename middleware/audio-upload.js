const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const audioStorage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    // Ensure files are considered "raw" to allow audio file upload
    resource_type: 'raw'
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Unsupported File Format'
      },
      false
    );
  }
};

const audioUpload = multer({
  audioStorage,
  limits: {
    fieldNameSize: 200,
    fileSize: 5 * 1024 * 1024
  },
  fileFilter
}).single('audio');

module.exports = audioUpload;
