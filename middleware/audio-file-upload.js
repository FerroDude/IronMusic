const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const audioStorage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    // Ensures that all files are considered "raw"
    // to enable video upload
    resource_type: 'raw',
    public_id: (req, file) => {
      // return file.originalname;
      const parts = file.originalname.split('.');
      const extension = parts[parts.length - 1];
      const randomName = `${String(Math.random()).replace(
        '.',
        ''
      )}.${extension}`;
      return randomName;
    }
  }
});

const audioUpload = multer({ storage: audioStorage });

module.exports = audioUpload;
