const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const NodeCanvasFactory = require('../canvas/canvasService')


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


exports.getPageImageFromPdf = async (pageNumber) => {
	try {
		const pdfDocument = await loadingTask.promise;
		const page = await pdfDocument.getPage(pageNumber)
		// Render the page on a Node canvas with 100% scale.
		let viewport = page.getViewport({scale: 2.0});
		let canvasFactory = new NodeCanvasFactory();
		let canvasAndContext = canvasFactory.create(
			viewport.width,
			viewport.height
		);
		console.log(viewport.width);
		console.log(viewport.height);
		let renderContext = {
			canvasContext: canvasAndContext.context,
			viewport: viewport,
		};
		let renderTask = page.render(renderContext);
		await renderTask.promise
		// Convert the canvas to an image buffer.

		const imageData = canvasAndContext.context.getImageData(0, 0, viewport.width, viewport.height);
		console.log(imageData);
		//return imageData.data.buffer;
		return canvasAndContext.canvas.toBuffer('image/png', {compressionLevel: 0})

	} catch (e) {
		console.log(e.message);
	}

}

