/* eslint-disable no-unused-vars */
import * as Randomizer from "../utils/randomizer";
import Users from "../models/mongo/schema";

/** Class representing a Droppable item */
export default class Droppable {
  constructor(item) {
    this.item = item;

    /**
     * Loot tables constructed as follows:
     * Key value pair mapping a drop threshold key to a crate.
     */
    this.crateTable = {
      0.40: { crate: "Starter" },
      0.70: { crate: "Standard" },
      0.80: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
    this.buffTable = {
      0.40: { crate: "Starter" },
      0.70: { crate: "Standard" },
      0.80: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
    this.gearTable = {
      0.40: { crate: "Starter" },
      0.70: { crate: "Standard" },
      0.80: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
  }

  calculateDrops() {
    const { item } = this;
  }
}
