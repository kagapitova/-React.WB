import { Unit } from "./Unit.js";
import { Action, UnitConfig } from "./types.js";

export class Warrior extends Unit {
    damage: number;

    constructor(config: UnitConfig & { damage: number }) {
        super(config);
        this.damage = config.damage;
    }

    performAction(target: Unit): Action {
        target.takeDamage(this.damage);
        console.log(`${this.name} атакует ${target.name} на ${this.damage} урона.`);
        return { type: "attack", value: this.damage };
    }
}
