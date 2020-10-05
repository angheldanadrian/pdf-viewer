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
