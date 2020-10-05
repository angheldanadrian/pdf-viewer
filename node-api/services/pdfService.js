const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const NodeCanvasFactory = require('./canvasService');
const fetch = require('node-fetch');


const CMAP_URL = "../../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

// const loadingTask = (pdfBuffer) => {
// 	return pdfjsLib.getDocument({
// 		data: pdfBuffer,
// 		cMapUrl: CMAP_URL,
// 		cMapPacked: CMAP_PACKED,
// 	});
// }

const pdfPath = process.argv[2] || "/home/xplicit/Desktop/testsvg.pdf";
const data = new Uint8Array(fs.readFileSync(pdfPath));

const fileSystemLoadingTask = pdfjsLib.getDocument({
		data: data,
		cMapUrl: CMAP_URL,
		cMapPacked: CMAP_PACKED,
	});



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
	const pdfDocument = await fileSystemLoadingTask.promise;
	//let pdfDocument = await initializeDocument();
	return pdfDocument.numPages;
}

exports.getPageImageFromPdf = async (pageNumber) => {
	try {
		const pdfDocument = await fileSystemLoadingTask.promise;
		//const pdfDocument = await initializeDocument();
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

	//TODO: initialize document a single time and cache:

//let cacheMap = new Map()
	/*exports.getNrOfPages = async () => {
		return await initializeCache(cacheMap);

	}


	const initializeCache = async (cacheMap) => {
		const pdfDocument = await initializeDocument();
		const firstPage = await pdfDocument.getPage(1);
		let viewport = firstPage.getViewport({scale: 2.0});
		let canvasFactory = new NodeCanvasFactory();
		let canvasAndContext = canvasFactory.create(
			viewport.width,
			viewport.height
		);
		let renderContext = {
			canvasContext: canvasAndContext.context,
			viewport: viewport,
		};
		let renderTask = firstPage.render(renderContext);
		await renderTask.promise
		const firstValue = canvasAndContext.canvas.toBuffer('image/png', {compressionLevel: 0})

		cacheMap.set(1,firstValue)
		for(let i = 2; i < pdfDocument.numPages; i++){
			let page = await pdfDocument.getPage(i);
			let renderTask = page.render(renderContext);
			try {
				await renderTask.promise
				let image = canvasAndContext.canvas.toBuffer('image/png', {compressionLevel: 0})
				cacheMap.set(i, image)
			}catch(e){
				cacheMap.set(i,0);
			}

		}
		return pdfDocument.numPages;
	}


	exports.getPageImageFromPdf = async (pageNumber) => {
		try {
			return cacheMap.get(pageNumber);
		} catch (e) {
			console.log(e.message);
		}*/


