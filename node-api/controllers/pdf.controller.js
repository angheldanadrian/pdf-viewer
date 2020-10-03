const pdf2png = require('../pdf2image/pdf2png');

exports.getPage = async (req, res) => {
	try {
		const bufferImage = await pdf2png.getPageImageFromPdf(3);
		// return res.status(200).json({status: 200, data: bufferImage, message: "img buffer"});
		return res.status(200).send(bufferImage);
	} catch
		(e) {
		return res.status(400).json({status: 400, message: e.message});
	}
}
