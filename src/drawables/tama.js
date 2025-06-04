import { Tamacoochie } from "../game.js";
import { loadImage, CanvasRenderingContext2D } from 'canvas';
import {resolve} from 'node:path';

const tama = await loadImage(resolve(import.meta.dirname, '../../assets/tama.png'));
const tamaSleep = await loadImage(resolve(import.meta.dirname, '../../assets/tama_sleep.png'));

/**
 * idk
 * @param {Tamacoochie} coochie
 * @param {number} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export function drawTama(coochie, elapsedTime, ctx, canvasWidth, canvasHeight) {
  switch(coochie.currentScene) {
    case 'sleep':
      drawAsleep(elapsedTime, ctx, canvasWidth, canvasHeight);
      break;
    default:
      drawNormal(ctx, canvasWidth, canvasHeight);
      break;
  }
}

function drawNormal(ctx, canvasWidth, canvasHeight) {
  const x = canvasWidth / 2 - tama.width / 2;
  const y = canvasHeight / 2 - tama.height / 2 + 2;

  ctx.drawImage(tama, x, y);
}

function drawAsleep(elapsedTime, ctx, canvasWidth, canvasHeight) {
  const x = canvasWidth / 2 - tama.width / 2;
  const y = canvasHeight / 2 - tama.height / 2 + 2;

  ctx.drawImage(tamaSleep, x, y);

  const t = Math.round(elapsedTime / 400) % 5;
  const z1 = t >= 0 && t <= 1 ? 'Z' : '';
  const z2 = t >= 2 && t <= 3 ? 'Z' : '';
  const zXBase = x + tama.width;
  const zYBase = y;

  ctx.fillStyle = "#fff";
  ctx.font = '5px "Pixel"';
  ctx.fillText(z1, zXBase - 1, zYBase);
  ctx.fillText(z2, zXBase + 1, zYBase - 4);
}
