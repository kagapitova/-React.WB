"use strict";
// Реализация функций для каждой подсистемы
const Engine = {
    isOn: false,
    start() {
        console.log("Двигатель запущен.");
        return Object.assign(Object.assign({}, this), { isOn: true });
    },
    stop() {
        console.log("Двигатель остановлен.");
        return Object.assign(Object.assign({}, this), { isOn: false });
    },
    getStatus() {
        return this.isOn ? "Двигатель работает" : "Двигатель остановлен";
    }
};
const ClimateControl = {
    isOn: false,
    temperature: 22,
    start() {
        console.log("Климат-контроль включен.");
        return Object.assign(Object.assign({}, this), { isOn: true });
    },
    stop() {
        console.log("Климат-контроль выключен.");
        return Object.assign(Object.assign({}, this), { isOn: false });
    },
    setTemperature(temperature) {
        console.log(`Температура установлена на ${temperature}°C.`);
        return Object.assign(Object.assign({}, this), { temperature });
    },
    getStatus() {
        return this.isOn ? `Климат-контроль включен на ${this.temperature}°C` : "Климат-контроль выключен";
    }
};
const MultimediaSystem = {
    isOn: false,
    currentTrack: null,
    start() {
        console.log("Музыкальная система включена.");
        return Object.assign(Object.assign({}, this), { isOn: true });
    },
    stop() {
        console.log("Музыкальная система выключена.");
        return Object.assign(Object.assign({}, this), { isOn: false });
    },
    playMusic(track) {
        console.log(`Воспроизведение трека: ${track}.`);
        return Object.assign(Object.assign({}, this), { currentTrack: track, isOn: true });
    },
    stopMusic() {
        console.log("Музыка остановлена.");
        return Object.assign(Object.assign({}, this), { currentTrack: null, isOn: false });
    },
    getStatus() {
        return this.isOn && this.currentTrack ? `Воспроизводится: ${this.currentTrack}` : "Музыка не воспроизводится";
    }
};
// Функции для автомобиля
const Car = {
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
