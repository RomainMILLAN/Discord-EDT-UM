"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUptime = void 0;
function sendUptime() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.APP_ENV !== 'PROD')
            return;
        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (discordWebhookUrl === "")
            return;
        const body = {
            embeds: [
                {
                    title: "📊 Service connexion",
                    color: "65280",
                    fields: [
                        {
                            name: "Service name",
                            value: "Discord EDT UM"
                        },
                        {
                            name: "State",
                            value: "Bot connecté ✅"
                        }
                    ]
                }
            ]
        };
        yield fetch(discordWebhookUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    });
}
exports.sendUptime = sendUptime;
exports.default = sendUptime;
