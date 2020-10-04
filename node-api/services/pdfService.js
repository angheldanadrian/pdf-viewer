const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const NodeCanvasFactory = require('./canvasService')


// Some PDFs need external cmaps.
const CMAP_URL = "../../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

// Loading file from file system into typed array.
const pdfPath =
	process.argv[2] || "/home/xplicit/Desktop/testsvg.pdf";
const data = new Uint8Array(fs.readFileSync(pdfPath));

// Load the PDF file.
const loadingTask = pdfjsLib.getDocument({
	data: data,
	cMapUrl: CMAP_URL,
	cMapPacked: CMAP_PACKED,
});

exports.getNrOfPages = async () => {
	const pdfDocument = await loadingTask.promise;
	return pdfDocument.numPages;
}


exports.getPageImageFromPdf = async (pageNumber) => {
	try {
		const pdfDocument = await loadingTask.promise;
		const page = await pdfDocument.getPage(pageNumber)
		let viewport = page.getViewport({scale: 2.0});
		let canvasFactory = new NodeCanvasFactory();
		let canvasAndContext = canvasFactory.create(
			viewport.width,
			viewport.height
		);
		let renderContext = {
			canvasContext: canvasAndContext.context,
			viewport: viewport,
		};
		let renderTask = page.render(renderContext);
		await renderTask.promise
		return canvasAndContext.canvas.toBuffer('image/png', {compressionLevel: 0})

	} catch (e) {
		console.log(e.message);
	}

}

