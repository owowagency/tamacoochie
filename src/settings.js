import { Panels } from 'flipdisc';

export const FPS = 15;
export const PANEL_RESOLUTION = [28, 7];
export const PANEL_LAYOUT = [3, 2];

export const LAYOUT = [
  [3, 2, 1],
  [4, 5, 6],
  [9, 8, 7],
  [10, 11, 12],
];

export const DEVICES = [{
  path: '/dev/ttyACM0',
  addresses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  baudRate: 57600,
}];

export const OPTIONS = {
  isMirrored: true,
  panel: {
    width: PANEL_RESOLUTION[0],
    height: PANEL_RESOLUTION[1],
    type: Panels.AlfaZetaPanel,
  },
};
