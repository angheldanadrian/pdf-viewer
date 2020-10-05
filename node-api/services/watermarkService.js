const Jimp = require('jimp');


exports.addWatermark = async (buffer, text) => {
	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
	const image = await Jimp.read(buffer);
	image.print(font, 10, 700, text);
	return image;
}

