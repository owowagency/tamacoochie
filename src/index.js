import { Ticker } from "./ticker.js";
import { createCanvas, registerFont } from "canvas";
import fs from "node:fs";
import path from "node:path";
import { FPS, LAYOUT, DEVICES, OPTIONS } from "./settings.js";
import { createDisplay } from "flipdisc";
import "./preview.js";
import { drawTama } from "./drawables/tama.js";

const IS_DEV = process.argv.includes("--dev");
let tamacoochieStatus = {
  foodLevel: null,
  sleepLevel: null,
  playLevel: null,
  currentScene: "default",
  currentPlayer: null,
  creationTime: null,
  isDead: null,
};

async function updateStatus() {
  try {
    const response = await fetch("https://tamacoochie.owow.app/status");
    if (!response.ok) throw new Error("Failed to fetch status");

    const data = await response.json();

    console.log(`Updated Status`, data);

    Object.assign(tamacoochieStatus, {
      foodLevel: data.foodLevel,
      sleepLevel: data.sleepLevel,
      playLevel: data.playLevel,
      currentScene: data.currentScene,
      currentPlayer: data.currentPlayer,
      creationTime: data.creationTime,
      isDead: data.isDead,
    });

    console.log("Status updated:", tamacoochieStatus);
  } catch (error) {
    console.error("Error updating Tamacoochie status:", error);
  }
}

setInterval(updateStatus, 2000);

// Create display
const display = createDisplay(LAYOUT, DEVICES, OPTIONS);
const { width, height } = display;

// Create output directory if it doesn't exist
const outputDir = "./output";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Register fonts
registerFont(path.resolve(import.meta.dirname, "../fonts/cg-pixel-4x5.otf"), {
  family: "Pixel",
});
registerFont(
  path.resolve(import.meta.dirname, "../fonts/OpenSans-Variable.ttf"),
  { family: "OpenSans" },
);
registerFont(
  path.resolve(import.meta.dirname, "../fonts/PPNeueMontrealMono-Regular.ttf"),
  { family: "PPNeueMontreal" },
);
registerFont(path.resolve(import.meta.dirname, "../fonts/Px437_ACM_VGA.ttf"), {
  family: "Px437_ACM_VGA",
});

// Create canvas with the specified resolution
const canvas = createCanvas(width, height);
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
  ctx.clearRect(0, 0, width, height);

  // Fill the canvas with a black background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  drawTama(tamacoochieStatus, elapsedTime, ctx, width, height);

  if (IS_DEV) {
    // Save the canvas as a PNG file
    const filename = path.join(outputDir, "frame.png");
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(filename, buffer);
  } else {
    const { data } = ctx.getImageData(0, 0, display.width, display.height);
    display.send([...data.values()]);
  }
});
