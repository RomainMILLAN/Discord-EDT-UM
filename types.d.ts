import { Collection, CommandInteraction, SlashCommandBuilder, SlashCommand } from "discord.js"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string,
            APP_ID: string,
            GUILD_ID: string,
            R_OP: string,
            R_STAFF: string,
            TC_SENTRY: string,
            APP_ENV: string,
            APP_DEBUGING: string,
            DISCORD_WEBHOOK_URL: string,
            DASHBOARD_URL: string,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: string,
    once ?: boolean | false,
    execute: (...args) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    async execute: (interaction: CommandInteraction) => Promise<void>
}