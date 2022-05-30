const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({cloudinary, 
  params: {
    allowed_formats: ['mp4', 'jpg', 'png'],
    resource_type: 'auto'
  }
})

//                     storage: storage
module.exports = multer({ storage });