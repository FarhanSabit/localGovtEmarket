const multer = require('multer');
const upload = multer({ dest: '/public/uploads/' }); // Specify the folder to store files

module.exports = upload;