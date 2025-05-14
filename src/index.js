import { Ticker } from "./ticker.js";
import { createCanvas } from "canvas";
import fs from "node:fs";
import path from "node:path";
import { RESOLUTION, FPS } from "./settings.js";
import "./preview.js";

// Create output directory if it doesn't exist
const outputDir = "./output";
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Create canvas with the specified resolution
const canvas = createCanvas(RESOLUTION[0], RESOLUTION[1]);
const ctx = canvas.getContext("2d");

// Disable anti-aliasing and image smoothing
ctx.imageSmoothingEnabled = false;
// Set a pixel-perfect monospace font
ctx.font = "18px monospace";
// Align text precisely to pixel boundaries
ctx.textBaseline = "top";

// Initialize the ticker at x frames per second
const ticker = new Ticker({ fps: FPS });

ticker.start(({ deltaTime, elapsedTime }) => {
	// Clear the console
	console.clear();
	console.time("Write frame");

	// Log approximately once per second
	// if (elapsedTime % 1000 < 20) {
	// 	console.log(`Delta: ${deltaTime}`);
	// }

	const [width, height] = RESOLUTION;
	console.log(`Rendering a ${width}x${height} canvas`);
	console.log("View at http://localhost:3000/view");

	ctx.clearRect(0, 0, width, height);

	// Fill the canvas with a black background
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);

	// Draw the elapsed time in seconds (rounded to 2 decimal places)
	ctx.fillStyle = "#fff";
	ctx.fillText((elapsedTime / 1000).toFixed(2), 0, 0);

	// Example: Draw a moving white dot
	{
		// Time based sine wave
		const sine = Math.sin(elapsedTime / 1000);
		const size = 5; // 5x5 pixels
		// Map sine wave to x-axis
		const x = Math.floor(((sine + 1) / 2) * width) - size / 2;
		const y = height - size;
		ctx.fillStyle = "#fff";

		// Draw the dot (a filled circle)
		ctx.beginPath();
		ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
		ctx.fill();
	}

	// Convert image to binary (purely black and white) for flipdot display
	{
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			// Apply thresholding - any pixel above 127 brightness becomes white (255), otherwise black (0)
			const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
			const binary = brightness > 127 ? 255 : 0;
			data[i] = binary; // R
			data[i + 1] = binary; // G
			data[i + 2] = binary; // B
			data[i + 3] = 255; // The board is not transparent :-)
		}
		ctx.putImageData(imageData, 0, 0);
	}

	// Save the canvas as a PNG file
	const filename = path.join(outputDir, "frame.png");
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync(filename, buffer);
	console.timeEnd("Write frame");
});
