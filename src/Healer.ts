import { Unit } from "./Unit.js";
import { Action, UnitConfig } from "./types.js";

export class Healer extends Unit {
    healPower: number;
    damage: number;

    constructor(config: UnitConfig & { healPower: number }) {
        super(config);
        this.healPower = config.healPower;
        this.damage = config.damage;
    }

    performAction(target: Unit): Action {
        target.heal(this.healPower);
        console.log(`${this.name} лечит ${target.name} на ${this.healPower} здоровья.`);
        return { type: "heal", value: this.healPower };
    }
}
