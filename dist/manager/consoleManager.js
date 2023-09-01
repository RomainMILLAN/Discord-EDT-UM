"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConsole = exports.sendDebug = exports.sendInfo = void 0;
const date = new Date();
function sendInfo(body) {
    console.log("\x1b[1m[" + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "]\x1b[0m "
        +
            "\x1b[46mINFO\x1b[0m "
        +
            body);
}
exports.sendInfo = sendInfo;
function sendDebug(body) {
    console.log("\x1b[1m[" + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "]\x1b[0m "
        +
            "\x1b[45mDEBUG\x1b[0m "
        +
            body);
}
exports.sendDebug = sendDebug;
function sendConsole(body) {
    console.log("\x1b[1m[" + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "]\x1b[0m "
        +
            body);
}
exports.sendConsole = sendConsole;
exports.default = sendInfo;