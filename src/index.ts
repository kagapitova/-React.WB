interface Subsystem {
    isOn: boolean;
    start(): Subsystem;
    stop(): Subsystem;
    getStatus(): string;
}

interface ClimateControl extends Subsystem {
    temperature: number;
    setTemperature(temperature: number): ClimateControl;
}

interface MultimediaSystem extends Subsystem {
    currentTrack: string | null;
    playMusic(track: string): MultimediaSystem;
    stopMusic(): MultimediaSystem;
}

interface Car {
    getInfo(): string;
    getEngineStatus(engine: Subsystem): string;
    getClimateStatus(climate: ClimateControl): string;
    getMultimediaStatus(multimedia: MultimediaSystem): string;
    updateStatus(engine: Subsystem, climate: ClimateControl, multimedia: MultimediaSystem): void;
}

// Реализация функций для каждой подсистемы
const Engine: Subsystem = {
    isOn: false,
    start() {
        console.log("Двигатель запущен.");
        return { ...this, isOn: true };
    },
    stop() {
        console.log("Двигатель остановлен.");
        return { ...this, isOn: false };
    },
    getStatus() {
        return this.isOn ? "Двигатель работает" : "Двигатель остановлен";
    }
};

const ClimateControl: ClimateControl = {
    isOn: false,
    temperature: 22,
    start() {
        console.log("Климат-контроль включен.");
        return { ...this, isOn: true };
    },
    stop() {
        console.log("Климат-контроль выключен.");
        return { ...this, isOn: false };
    },
    setTemperature(temperature: number) {
        console.log(`Температура установлена на ${temperature}°C.`);
        return { ...this, temperature };
    },
    getStatus() {
        return this.isOn ? `Климат-контроль включен на ${this.temperature}°C` : "Климат-контроль выключен";
    }
};

const MultimediaSystem: MultimediaSystem = {
    isOn: false,
    currentTrack: null,
    start() {
        console.log("Музыкальная система включена.");
        return { ...this, isOn: true };
    },
    stop() {
        console.log("Музыкальная система выключена.");
        return { ...this, isOn: false };
    },
    playMusic(track: string) {
        console.log(`Воспроизведение трека: ${track}.`);
        return { ...this, currentTrack: track, isOn: true };
    },
    stopMusic() {
        console.log("Музыка остановлена.");
        return { ...this, currentTrack: null, isOn: false };
    },
    getStatus() {
        return this.isOn && this.currentTrack ? `Воспроизводится: ${this.currentTrack}` : "Музыка не воспроизводится";
    }
};

// Функции для автомобиля
const Car: Car = {
    getInfo() {
        return "Автомобиль: MyCar, 2014 года выпуска, пробег 235 000 км.";
    },
    getEngineStatus(engine) {
        return engine.getStatus();
    },
    getClimateStatus(climate) {
        return climate.getStatus();
    },
    getMultimediaStatus(multimedia) {
        return multimedia.getStatus();
    },
    updateStatus(engine, climate, multimedia) {
        console.log(this.getInfo());
        console.log(this.getEngineStatus(engine));
        console.log(this.getClimateStatus(climate));
        console.log(this.getMultimediaStatus(multimedia));
    }
};

// Демонстрация работы
console.log("=== Информация об автомобиле ===");
Car.updateStatus(Engine, ClimateControl, MultimediaSystem);

console.log("\n=== Запуск двигателя и климат-контроля ===");
let engine = Engine.start();
let climate = ClimateControl.start().setTemperature(24);
let multimedia = MultimediaSystem.playMusic("Favorite Song");

console.log("\n=== Обновленная информация о состоянии ===");
Car.updateStatus(engine, climate, multimedia);

console.log("\n=== Остановка музыки и двигателя ===");
multimedia = multimedia.stopMusic();
engine = engine.stop();
climate = climate.stop();

console.log("\n=== Итоговая информация о состоянии ===");
Car.updateStatus(engine, climate, multimedia);
