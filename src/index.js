import { Ticker } from "./ticker.js";
import { createCanvas, registerFont } from "canvas";
import fs from "node:fs";
import path from "node:path";
import { FPS, LAYOUT, DEVICES, OPTIONS } from "./settings.js";
import { createDisplay } from "flipdisc";
import "./preview.js";
import app from "./server.js";
import { Tamacoochie } from "./game.js";
import listen from "./server.js";

const IS_DEV = process.argv.includes("--dev");

// Create display
const display = createDisplay(LAYOUT, DEVICES, OPTIONS);
const { width, height } = display;

// Create output directory if it doesn't exist
const outputDir = "./output";
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Create canvas with the specified resolution
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Disable anti-aliasing and image smoothing
ctx.imageSmoothingEnabled = false;
// Set a pixel-perfect monospace font
ctx.font = "18px monospace";
// Align text precisely to pixel boundaries
ctx.textBaseline = "top";

const tamacoochie = new Tamacoochie();
tamacoochie.start();
listen(tamacoochie);

// Initialize the ticker at x frames per second
const ticker = new Ticker({ fps: FPS });

ticker.start(({ deltaTime, elapsedTime }) => {
	if (IS_DEV) {
		// Save the canvas as a PNG file
		const filename = path.join(outputDir, "frame.png");
		const buffer = canvas.toBuffer("image/png");
		fs.writeFileSync(filename, buffer);
	} else {
		const { data } = ctx.getImageData(0, 0, display.width, display.height);
		display.send([...data.values()]);
	}

	// console.log(`Eslapsed time: ${(elapsedTime / 1000).toFixed(2)}s`);
	// console.log(`Delta time: ${deltaTime.toFixed(2)}ms`);
	// console.timeEnd("Write frame");
});
