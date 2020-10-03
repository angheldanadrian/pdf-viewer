const pdf2png = require('../pdf2image/pdf2png');

exports.getPage = async (req, res) => {
	const pageNumber = parseInt(req.params.pageNumber);
	console.log(pageNumber);
	try {
		const result = await pdf2png.getPageImageFromPdf(pageNumber);
		return res.status(200).send(result);
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
