const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const stuffCtrl = require('../controllers/stuff')

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.changeOneThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);


module.exports = router;