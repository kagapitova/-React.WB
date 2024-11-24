import { Warrior } from "./Warrior.js";
import { Healer } from "./Healer.js";
import { Unit } from "./Unit.js";
import { UnitConfig } from "./types.js";

export class Game {
    playerUnits: Unit[] = [];
    aiUnits: Unit[] = [];
    log: string[] = [];

    constructor() {
        this.initializeUnits();
    }

    private initializeUnits(): void {
        const playerWarriorConfig: UnitConfig = {
            id: "1",
            name: "Player Warrior",
            health: 100,
            maxHealth: 100,
            energy: 10,
            maxEnergy: 10,
            damage: 15, // Урон воителя
            healPower: 0, // Воитель не может лечить
            type: "warrior",
        };
    
        const playerHealerConfig: UnitConfig = {
            id: "2",
            name: "Player Healer",
            health: 80,
            maxHealth: 80,
            energy: 15,
            maxEnergy: 15,
            damage: 5, // Слабый урон
            healPower: 20, // Сильное лечение
            type: "healer",
        };
    
        const aiWarriorConfig: UnitConfig = {
            id: "3",
            name: "AI Warrior",
            health: 100,
            maxHealth: 100,
            energy: 10,
            maxEnergy: 10,
            damage: 15,
            healPower: 0,
            type: "warrior",
        };
    
        const aiHealerConfig: UnitConfig = {
            id: "4",
            name: "AI Healer",
            health: 80,
            maxHealth: 80,
            energy: 15,
            maxEnergy: 15,
            damage: 5,
            healPower: 20,
            type: "healer",
        };
    
        // Создаем юнитов игрока и ИИ
        this.playerUnits = [
            new Warrior(playerWarriorConfig),
            new Healer(playerHealerConfig),
        ];
    
        this.aiUnits = [
            new Warrior(aiWarriorConfig),
            new Healer(aiHealerConfig),
        ];
    }

    startBattle(): void {
        while (this.playerUnits.length > 0 && this.aiUnits.length > 0) {
            this.playerTurn();
            this.aiTurn();
        }
        console.log(this.log);
    }

    private playerTurn(): void {
        this.playerUnits.forEach((unit) => {
            const target = this.aiUnits[0];
            const action = unit.performAction(target);
            this.log.push(`${unit.name} ${action.type} ${target.name} for ${action.value}`);
        });
    }

    private aiTurn(): void {
        this.aiUnits.forEach((unit) => {
            const target = this.playerUnits[0];
            const action = unit.performAction(target);
            this.log.push(`${unit.name} ${action.type} ${target.name} for ${action.value}`);
        });
    }
}
