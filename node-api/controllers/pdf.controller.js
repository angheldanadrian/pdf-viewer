const pdf2png = require('../services/pdfService');
const watermarkService = require("../services/watermarkService");

exports.getPage = async (req, res, next) => {
	const pageNumber = parseInt(req.params.pageNumber);
	try {
		const imageBuffer = await pdf2png.getPageImageFromPdf(pageNumber);
		if (imageBuffer) {
			let watermarkedBuffer = await watermarkService.getWatermarkedBuffer(imageBuffer)
			return res.status(200).send(watermarkedBuffer);
		}
		res.status(200).send([]);
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
}


exports.getNrPages = async (req, res) => {
	try {
		const nrPages = await pdf2png.getNrOfPages();
		return res.status(200).json({status: 200, data: nrPages});
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
}
