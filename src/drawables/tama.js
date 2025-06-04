import { Tamacoochie } from "../game.js";
import { loadImage, CanvasRenderingContext2D } from 'canvas';
import {resolve} from 'node:path';

const tamaDefault = await Promise.all([
  loadImage(resolve(import.meta.dirname, '../../assets/default/1.png')),
  loadImage(resolve(import.meta.dirname, '../../assets/default/2.png')),
]);

const tamaPlay = await Promise.all([
  loadImage(resolve(import.meta.dirname, '../../assets/play/1.png')),
  loadImage(resolve(import.meta.dirname, '../../assets/play/2.png')),
]);

const tamaDead = await Promise.all([
  loadImage(resolve(import.meta.dirname, '../../assets/dead/1.png')),
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
  switch(coochie.currentScene) {
    case 'playing':
      drawPlaying(elapsedTime, ctx, canvasWidth, canvasHeight);
      break;
    case 'dead':
      drawDead(elapsedTime, ctx, canvasWidth, canvasHeight);
      break;
    default:
      drawDefault(elapsedTime, ctx, canvasWidth, canvasHeight);
      break;
  }
}

function drawDefault(elapsedTime, ctx, canvasWidth, canvasHeight) {
  const x = 4;
  const y = canvasHeight / 2 - TamaSize / 2;

  const frame = Math.floor(elapsedTime / 500) % tamaDefault.length;
  const sprite = tamaDefault[frame];

  ctx.drawImage(sprite, x, y);
}

function drawPlaying(elapsedTime, ctx, canvasWidth, canvasHeight) {
  const x = 4;
  const y = canvasHeight / 2 - TamaSize / 2;

  const frame = Math.floor(elapsedTime / 500) % tamaPlay.length;
  const sprite = tamaPlay[frame];

  ctx.drawImage(sprite, x, y);
}

function drawDead(elapsedTime, ctx, canvasWidth, canvasHeight) {
  const x = 4;
  const y = canvasHeight / 2 - TamaSize / 2;

  const frame = 0;
  const sprite = tamaDead[frame];

  ctx.drawImage(sprite, x, y);
}
