const pdf2png = require('../services/pdfService');
const watermarkService = require("../services/watermarkService");

exports.getPage = async (req, res, next) => {
	const pageNumber = parseInt(req.params.pageNumber);
	console.log(pageNumber);
	try {
		const imageBuffer = await pdf2png.getPageImageFromPdf(pageNumber);
		if (imageBuffer) {
			const text = 'Doc.ID 123-456789 – john.doe@somedomain. Redistribution/printing not permitted.'
			const watermarkedImage = await watermarkService.addWatermark(imageBuffer, text)
			const watermarkedImageBuffer = await watermarkedImage.getBufferAsync('image/png');
			return res.status(200).send(watermarkedImageBuffer);
		}
		res.status(200).send(imageBuffer)
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
