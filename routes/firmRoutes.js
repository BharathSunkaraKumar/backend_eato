const express = require('express');
const router = express.Router();
// const path = require('path');
const verifyToken  = require('../middlewares/verifyToken');
const firmcontroller = require('../controllers/firmcontroller');

router.post('/add-firm',verifyToken, firmcontroller.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '..', '/upload', imageName));
});
router.delete('/:firmId', firmcontroller.deleteFirmById);
module.exports = router;