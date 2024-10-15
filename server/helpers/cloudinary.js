const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dezxjnm6b',
    api_key : '831165684694221',
    api_secret : '-FKD170kVkLNPCytsSj1lflwnlU'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });
     
    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}