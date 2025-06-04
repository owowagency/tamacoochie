const config = {
  hungerDrainRate: 4,
  sleepDrainRate: 1,
  playDrainRate: 3,
  feedAmount: 1,
  sleepAmount: 1,
  playAmount: 1,
  speed: 1000, // 1 tick per second
  // speed: 3600 * 24 * 1000, // 1 tick per hour in ms
  debugSpeed: 1000, // 1 tick per second
};

export class Tamacoochie {
  constructor() {
    this.foodLevel = 24;
    this.sleepLevel = 24;
    this.playLevel = 24;
    this.isDead = false;
  }

  hungerDrain() {
    if (this.foodLevel > 0) {
      this.foodLevel -= config.hungerDrainRate;
    }
  }

  sleepDrain() {
    if (this.sleepLevel > 0) {
      this.sleepLevel -= config.sleepDrainRate;
    }
  }

  playDrain() {
    if (this.playLevel > 0) {
      this.playLevel -= config.playDrainRate;
    }
  }

  feed() {
    this.foodLevel += config.feedAmount;
  }

  sleep() {
    this.sleepLevel += config.sleepAmount;
  }

  play() {
    this.playLevel += config.playAmount;
  }

  tick() {
    this.hungerDrain();
    this.sleepDrain();
    this.playDrain();

    if (this.didTamagatchiDie()) {
      this.isDead = true;
      console.log("Tamagatchi died!");
    }
  }

  log() {
    console.log(
      `Food: ${this.foodLevel}, Sleep: ${this.sleepLevel}, Play: ${this.playLevel}`,
    );
  }

  start() {
    setInterval(() => this.tick(), config.speed);
    setInterval(() => this.log(), config.debugSpeed);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  didTamagatchiDie() {
    if (this.foodLevel === 0 || this.sleepLevel === 0 || this.playLevel === 0) {
      return true;
    } else return false;
  }
}

export const tamacoochie = new Tamacoochie();

tamacoochie.start();
