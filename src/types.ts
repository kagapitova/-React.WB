export type UnitType = "warrior" | "healer";

export interface Action {
    type: "attack" | "heal" | "none";
    value?: number;
}

export interface UnitConfig {
    id: string;
    name: string;
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    damage: number;
    healPower: number;
    type: UnitType;
}
