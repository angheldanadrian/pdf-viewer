const express = require('express');
const router = express.Router();

const pdfController = require('../controllers/pdf.controller');

router.get('/pdf/:pageNumber',pdfController.getPage);


module.exports = router;


