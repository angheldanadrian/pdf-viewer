const Jimp = require('jimp');

exports.getWatermarkedBuffer = async (imageBuffer) => {
	const text = 'Doc.ID 123-456789 – john.doe@somedomain. Redistribution/printing not permitted.';
	const watermarkedImage = await addWatermark(imageBuffer, text);
	return await watermarkedImage.getBufferAsync('image/png');
}

const addWatermark = async (buffer, text) => {
	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
	const image = await Jimp.read(buffer);
	image.print(font, 10, 700, text);
	return image;
}
