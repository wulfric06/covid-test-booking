const multer = require('multer');
const path = require('path');
const newPath = require('path').resolve;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'profile') {
      const destination = newPath('static/uploads');
      cb(null, destination);
    } else {
      const destination = path.join(__dirname, `../../../../${process.env.DIR_NAME}`);
      cb(null, destination);
    }
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

module.exports = {
  upload: multer({ storage })
};
