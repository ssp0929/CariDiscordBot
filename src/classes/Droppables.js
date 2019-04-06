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
      0.4: { crate: "Starter" },
      0.7: { crate: "Standard" },
      0.8: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
    this.buffTable = {
      0.4: { crate: "Starter" },
      0.7: { crate: "Standard" },
      0.8: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
    this.gearTable = {
      0.4: { crate: "Starter" },
      0.7: { crate: "Standard" },
      0.8: { crate: "Pro" },
      0.95: { crate: "Unleashed" },
      0.99: { crate: "Dableashed" },
    };
  }

  calculateDrops() {
    const { item } = this;
  }
}