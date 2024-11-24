import { Unit } from "./Unit.js";
import { UnitType } from "./types.js";
import { Warrior } from "./Warrior.js";
import { Healer } from "./Healer.js";

const unitCatalog = document.getElementById("unitCatalog")!;
const startGameButton = document.getElementById("startGameButton") as HTMLButtonElement;
const autoBattleButton = document.getElementById("autoBattleButton") as HTMLButtonElement;

autoBattleButton.addEventListener("click", () => {
    console.log("Autobattle started!");
    autoBattle();
});

let selectedUnits: Unit[] = [];
const MAX_SELECTED_UNITS = 3;

function renderUnitCatalog(units: Unit[]) {
    console.log("Units rendered:", units);
    unitCatalog.innerHTML = "";
    units.forEach((unit) => {
        const unitElement = document.createElement("div");
        unitElement.className = "unit";
        unitElement.innerHTML = `
            <h4>${unit.name}</h4>
            <p>Health: ${unit.health}</p>
            <p>Energy: ${unit.energy}</p>
            <p>Type: ${unit.type}</p>
            <button class="select-unit-button" data-id="${unit.id}">Select</button>
        `;
        unitCatalog.appendChild(unitElement);
    });

    document.querySelectorAll(".select-unit-button").forEach((button) => {
        button.addEventListener("click", () => {
            const unitId = (button as HTMLButtonElement).dataset.id!;
            const selectedUnit = units.find((u) => u.id === unitId);
            if (selectedUnit && selectedUnits.length < MAX_SELECTED_UNITS) {
                selectedUnits.push(selectedUnit);
                button.setAttribute("disabled", "true");
                updateStartGameButtonState();
            }
        });
    });
}

function updateStartGameButtonState() {
    startGameButton.disabled = selectedUnits.length !== MAX_SELECTED_UNITS;
}

startGameButton.addEventListener("click", () => {
    if (selectedUnits.length === MAX_SELECTED_UNITS) {
        startBattle(selectedUnits);
        document.getElementById("unitSelection")!.style.display = "none";
        document.getElementById("battleArea")!.style.display = "block";
    }
});

function startBattle(playerUnits: Unit[]) {
    const aiUnits = generateRandomUnits(3);
    console.log("Битва началась!");
    console.log("Игрок:", playerUnits);
    console.log("ИИ:", aiUnits);
}

function generateRandomUnits(count: number): Unit[] {
    return Array.from({ length: count }, (_, i) => {
        const type: UnitType = Math.random() > 0.5 ? "warrior" : "healer";
        if (type === "warrior") {
            return new Warrior({
                id: `unit-${i}`,
                name: `Warrior ${i + 1}`,
                health: 100,
                maxHealth: 100,
                energy: 50,
                maxEnergy: 50,
                damage: Math.floor(Math.random() * 10) + 10,
                healPower: 0,
                type,
            });
        } else {
            return new Healer({
                id: `unit-${i}`,
                name: `Healer ${i + 1}`,
                health: 80,
                maxHealth: 80,
                energy: 50,
                maxEnergy: 50,
                damage: 5,
                healPower: Math.floor(Math.random() * 10) + 10,
                type,
            });
        }
    });
}

function autoBattle() {
    const playerUnits = selectedUnits.filter((unit) => unit.health > 0);
    const aiUnits = generateRandomUnits(3);

    const battleLog = document.getElementById("logList")!;

    while (playerUnits.length > 0 && aiUnits.length > 0) {
        // Игрок атакует
        playerUnits.forEach((playerUnit) => {
            if (aiUnits.length === 0) return; // Прерывание, если врагов больше нет
            const target = aiUnits[Math.floor(Math.random() * aiUnits.length)];
            target.health -= playerUnit.damage; // Наносим урон
            logAction(`${playerUnit.name} атакует ${target.name}, урон: ${playerUnit.damage}`, battleLog);

            // Если здоровье цели 0 или меньше, удаляем ее
            if (target.health <= 0) {
                logAction(`${target.name} уничтожен!`, battleLog);
                aiUnits.splice(aiUnits.indexOf(target), 1);
            }
        });

        // ИИ атакует
        aiUnits.forEach((aiUnit) => {
            if (playerUnits.length === 0) return; // Прерывание, если игроков больше нет
            const target = playerUnits[Math.floor(Math.random() * playerUnits.length)];
            target.health -= aiUnit.damage; // Наносим урон
            logAction(`${aiUnit.name} атакует ${target.name}, урон: ${aiUnit.damage}`, battleLog);

            // Если здоровье цели 0 или меньше, удаляем ее
            if (target.health <= 0) {
                logAction(`${target.name} уничтожен!`, battleLog);
                playerUnits.splice(playerUnits.indexOf(target), 1);
            }
        });

        // Обновляем интерфейс (например, здоровье юнитов)
        updateBattleUI(playerUnits, aiUnits);
    }

    // Проверяем, кто победил
    if (playerUnits.length > 0) {
        logAction("Победа игрока!", battleLog);
    } else if (aiUnits.length > 0) {
        logAction("Победа ИИ!", battleLog);
    } else {
        logAction("Ничья!", battleLog);
    }
}

function logAction(message: string, battleLog: HTMLElement) {
    const logEntry = document.createElement("li");
    logEntry.textContent = message;
    battleLog.appendChild(logEntry);
}

function updateBattleUI(playerUnits: Unit[], aiUnits: Unit[]) {
    const playerContainer = document.getElementById("playerUnits")!;
    const aiContainer = document.getElementById("aiUnits")!;

    playerContainer.innerHTML = playerUnits.map((unit) => renderUnit(unit)).join("");
    aiContainer.innerHTML = aiUnits.map((unit) => renderUnit(unit)).join("");
}

function renderUnit(unit: Unit): string {
    return `
        <div class="unit">
            <h4>${unit.name}</h4>
            <p>Health: ${Math.max(unit.health, 0)}</p>
            <p>Energy: ${unit.energy}</p>
        </div>
    `;
}


const randomUnits = generateRandomUnits(10);
renderUnitCatalog(randomUnits);
