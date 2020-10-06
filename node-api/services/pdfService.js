const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const NodeCanvasFactory = require('./canvasService');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const myCache = new NodeCache();


const CMAP_URL = "../../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

const loadingTask = (pdfBuffer) => {
	return pdfjsLib.getDocument({
		data: pdfBuffer,
		cMapUrl: CMAP_URL,
		cMapPacked: CMAP_PACKED,
	});
}

// const pdfPath = process.argv[2] || "/home/xplicit/Desktop/testsvg.pdf";
// const data = new Uint8Array(fs.readFileSync(pdfPath));
//
// const fileSystemLoadingTask = pdfjsLib.getDocument({
// 		data: data,
// 		cMapUrl: CMAP_URL,
// 		cMapPacked: CMAP_PACKED,
// 	});


const initializeDocument = async () => {
	const pdfBuffer = await download(process.env.PDF_URL);
	const document = loadingTask(pdfBuffer)
	return await document.promise;
}

const download = async (url) => {
	const response = await fetch(url);
	return await response.buffer();
}



exports.getNrOfPages = async () => {
	//const pdfDocument = await fileSystemLoadingTask.promise;
	let pdfDocument = await initializeDocument();
	return pdfDocument.numPages;
}

exports.getPageImageFromPdf = async (pageNumber) => {
	try {
		//const pdfDocument = await fileSystemLoadingTask.promise;
		const pdfDocument = await initializeDocument();
		const page = await pdfDocument.getPage(pageNumber)
		const viewport = page.getViewport({scale: 2.0});
		const canvasFactory = new NodeCanvasFactory();
		const canvasAndContext = canvasFactory.create(
			viewport.width,
			viewport.height
		);
		const renderContext = {
			canvasContext: canvasAndContext.context,
			viewport: viewport,
		};
		const renderTask = page.render(renderContext);
		await renderTask.promise
		return canvasAndContext.canvas.toBuffer('image/png', {compressionLevel: 0})

	} catch (e) {
		console.log(e.message);
	}

}

