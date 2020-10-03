const Router = require("express").Router;
const pdfController = require('../controllers/pdf.controller');


const router = Router();


router.get('/nrPages', pdfController.getNrPages);

router.get('/:pageNumber', pdfController.getPage);


module.exports = router;
