"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const consoleManager_1 = __importDefault(require("../manager/consoleManager"));
module.exports = (client) => {
    let eventsDir = (0, path_1.join)(__dirname, "../events");
    (0, fs_1.readdirSync)(eventsDir).forEach(file => {
        if (!file.endsWith('.js')) {
            return;
        }
        const event = require(`${eventsDir}/${file}`).default;
        if (event.once == true) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        (0, consoleManager_1.default)(`Event \x1b[4m${event.name}\x1b[0m charged`);
    });
};
