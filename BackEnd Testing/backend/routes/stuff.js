const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.changeOneThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;