import { Action, UnitConfig } from "./types.js";

export abstract class Unit {
    id: string;
    name: string;
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    type: string;
    damage: number;

    constructor(config: UnitConfig) {
        this.id = config.id;
        this.name = config.name;
        this.health = config.health;
        this.maxHealth = config.maxHealth;
        this.energy = config.energy;
        this.maxEnergy = config.maxEnergy;
        this.type = config.type;
        this.damage = config.damage;
    }

    abstract performAction(target: Unit): Action;

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
}
