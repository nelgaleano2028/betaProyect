const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = '${__dirname}/../storage';
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        // TODO: archivo.pdf foto.jpg video.mp4
        const ext = file.originalname.split('.').pop(); //TODO['archivo','pdf'] ['foto','jpg']
        const filename = 'file-' + Date.now() + '.' + ext;
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;