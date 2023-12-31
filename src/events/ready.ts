import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";
import { uptime } from "process";
import sendUptime from "../manager/uptime";
import sendInfo from "../manager/consoleManager";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        sendUptime()
        sendInfo(`Client ready '\x1b[1m${client.user.tag}\x1b[0m'`)
    }
}

export default event;