const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/address', addressController.createAddressAndRedirect);
router.get('/address', addressController.getAllAddress);
router.get('/address/:id', addressController.getAddressById);
router.put('/address/:id', addressController.updateAddress);
router.delete('/address/:id', addressController.deleteAddress);

module.exports = router;