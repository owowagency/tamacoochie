import relativeDate from "./utils/relativeDate.js";

const config = {
  hungerDrainRate: 0,
  sleepDrainRate: 0,
  playDrainRate: 2,
  feedAmount: 1,
  sleepAmount: 1,
  playAmount: 8,
  defaultFoodLevel: 24,
  defaultSleepLevel: 24,
  defaultPlayLevel: 24,
  sceneTimeOut: 10 * 1000, // 10 seconds
  speed: 1000 * 10, // 1 tick per minute
  // speed: 3600 * 24 * 1000, // 1 tick per hour in ms
  debugSpeed: 1000, // 1 tick per second
};

export class Tamacoochie {
  constructor() {
    this.foodLevel = config.defaultFoodLevel;
    this.sleepLevel = config.defaultSleepLevel;
    this.playLevel = config.defaultPlayLevel;
    this.isDead = false;
    this.creationTime = new Date();
    this.currentScene = "default";
    this.currentPlayer = null;
    this.sceneTimer = null;
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

  feed(playerName) {
    if (this.foodLevel > this.defaultFoodLevel) {
      return;
    }
    this.foodLevel += config.feedAmount;
    this.currentPlayer = playerName;
    this.currentScene = "feeding";
    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }
    this.sceneTimer = setTimeout(() => {
      this.currentScene = "default";
      this.currentPlayer = null;
    }, config.sceneTimeOut);
  }

  sleep(playerName) {
    if (this.sleepLevel > this.defaultSleepLevel) {
      return;
    }
    this.sleepLevel += config.sleepAmount;
    this.currentPlayer = playerName;
    this.currentScene = "sleeping";
    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }
    this.sceneTimer = setTimeout(() => {
      this.currentScene = "default";
      this.currentPlayer = null;
    }, config.sceneTimeOut);
  }

  play(playerName) {
    if (this.playLevel > this.defaultPlayLevel) {
      return;
    }
    this.playLevel += config.playAmount;
    this.currentPlayer = playerName;
    this.currentScene = "playing";
    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }
    this.sceneTimer = setTimeout(() => {
      this.currentScene = "default";
      this.currentPlayer = null;
    }, config.sceneTimeOut);
  }

  reset() {
    this.foodLevel = config.defaultFoodLevel;
    this.sleepLevel = config.defaultSleepLevel;
    this.playLevel = config.defaultPlayLevel;
    this.isDead = false;
    this.creationTime = new Date();
    this.currentScene = "default";
    this.currentPlayer = null;
    this.sceneTimer = null;
  }

  tick() {
    // Disabling for now
    // this.hungerDrain();
    // this.sleepDrain();
    this.playDrain();

    if (this.didTamagatchiDie()) {
      this.isDead = true;
      console.log("Tamagatchi died!");
      this.currentScene = "dead";
      this.currentPlayer = null;
    }
  }

  log() {
    console.clear();
    console.log(
      `Food: ${this.foodLevel}, Sleep: ${this.sleepLevel}, Play: ${this.playLevel}`,
    );
    console.log(`Scene: ${this.currentScene}`);
    console.log(`Player: ${this.currentPlayer}`);
    const dateString = relativeDate(this.creationTime);
    console.log(`Born: ${dateString}`);
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

  status() {
    return {
      foodLevel: this.foodLevel,
      sleepLevel: this.sleepLevel,
      playLevel: this.playLevel,
      currentScene: this.currentScene,
      currentPlayer: this.currentPlayer,
      creationTime: this.creationTime,
      isDead: this.isDead,
    };
  }
}
