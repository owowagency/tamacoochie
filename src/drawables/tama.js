import { Tamacoochie } from "../game.js";
import { loadImage, CanvasRenderingContext2D } from "canvas";
import { resolve } from "node:path";

const tamaDefault = await Promise.all([
  loadImage(resolve(import.meta.dirname, "../../assets/default/1.png")),
  loadImage(resolve(import.meta.dirname, "../../assets/default/2.png")),
]);

const tamaPlay = await Promise.all([
  loadImage(resolve(import.meta.dirname, "../../assets/play/1.png")),
  loadImage(resolve(import.meta.dirname, "../../assets/play/2.png")),
]);

const tamaDead = await Promise.all([
  loadImage(resolve(import.meta.dirname, "../../assets/dead/1.png")),
]);

const TamaSize = 24;

/**
 * idk
 * @param {Tamacoochie} coochie
 * @param {number} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export function drawTama(coochie, elapsedTime, ctx, canvasWidth, canvasHeight) {
  switch (coochie.currentScene) {
    case "playing":
      drawPlaying(
        elapsedTime,
        ctx,
        canvasWidth,
        canvasHeight,
        coochie.currentPlayer,
      );
      break;
    case "dead":
      drawDead(elapsedTime, ctx, canvasWidth, canvasHeight);
      break;
    default:
      drawDefault(
        elapsedTime,
        ctx,
        canvasWidth,
        canvasHeight,
        coochie.playLevel,
      );
      break;
  }
}

/**
 * idk
 * @param {number} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
function drawDefault(elapsedTime, ctx, canvasWidth, canvasHeight, health) {
  {
    const x = 4;
    const y = canvasHeight / 2 - TamaSize / 2;

    const frame = Math.floor(elapsedTime / 500) % tamaDefault.length;
    const sprite = tamaDefault[frame];

    ctx.drawImage(sprite, x, y);
  }

  const text = "Play with me";
  const { width, actualBoundingBoxDescent } = ctx.measureText(text);

  {
    ctx.fillStyle = "#fff";
    ctx.font = '5px "Pixel"';

    const x = 4 + TamaSize + 4;
    const y = Math.round(canvasHeight / 2 - actualBoundingBoxDescent - 1);

    ctx.fillText(text, x, y);
  }

  {
    const x = 4 + TamaSize + 4;
    const y = Math.round(canvasHeight / 2 + 1);

    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, 6);

    ctx.fillStyle = "#000";
    ctx.fillRect(x + 1, y + 1, width - 2, 4);

    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 2, y + 2, health * 2, 2);
  }
}

/**
 * idk
 * @param {number} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
function drawPlaying(elapsedTime, ctx, canvasWidth, canvasHeight, name) {
  {
    const x = 4;
    const y = canvasHeight / 2 - TamaSize / 2;

    const frame = Math.floor(elapsedTime / 500) % tamaPlay.length;
    const sprite = tamaPlay[frame];

    ctx.drawImage(sprite, x, y);
  }

  {
    const text = `${name}\n\nis playing`;

    ctx.fillStyle = "#fff";
    ctx.font = '5px "Pixel"';

    const { actualBoundingBoxDescent } = ctx.measureText(text);

    const x = 4 + TamaSize + 4;
    const y = Math.round(canvasHeight / 2 - actualBoundingBoxDescent / 2);

    ctx.fillText(text, x, y);
  }
}

/**
 * idk
 * @param {number} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
function drawDead(elapsedTime, ctx, canvasWidth, canvasHeight) {
  {
    const x = 4;
    const y = canvasHeight / 2 - TamaSize / 2;

    const frame = 0;
    const sprite = tamaDead[frame];

    ctx.drawImage(sprite, x, y);
  }

  {
    const text = "Tamacoochie\n\nDied...";

    ctx.fillStyle = "#fff";
    ctx.font = '5px "Pixel"';

    const { actualBoundingBoxDescent } = ctx.measureText(text);

    const x = 4 + TamaSize + 4;
    const y = Math.round(canvasHeight / 2 - actualBoundingBoxDescent / 2);

    ctx.fillText(text, x, y);
  }
}
