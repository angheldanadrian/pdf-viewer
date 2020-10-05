var assert = require("assert").strict;
var Canvas = require("canvas");


function NodeCanvasFactory() {}
NodeCanvasFactory.prototype = {

	create: function NodeCanvasFactory_create(width, height) {
		assert(width > 0 && height > 0, "Invalid canvas size");
		const canvas = Canvas.createCanvas(width, height);
		const context = canvas.getContext("2d");
		return {
			canvas: canvas,
			context: context,
		};
	},

	destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
		assert(canvasAndContext.canvas, "Canvas is not specified");

		canvasAndContext.canvas.width = 0;
		canvasAndContext.canvas.height = 0;
		canvasAndContext.canvas = null;
		canvasAndContext.context = null;
	},
};

module.exports = NodeCanvasFactory;
