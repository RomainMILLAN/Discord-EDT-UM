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
exports.command = void 0;
const discord_js_1 = require("discord.js");
const consoleManager_1 = require("../manager/consoleManager");
exports.command = {
    name: "edt",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("edt")
        .setDescription("Affiche l'emploi du temp d'un groupe")
        .addStringOption((option) => {
        return option
            .setName("groupe")
            .setDescription("Classe de l'emploi du temp")
            .setRequired(true)
            .addChoices({
            name: "INFO S6",
            value: "1"
        }, {
            name: "INFO Q5",
            value: "2"
        }, {
            name: "INFO G5",
            value: "3"
        });
    })
        .addStringOption((option) => {
        return option
            .setName("date")
            .setDescription("Date de l'emploi du temp")
            .setRequired(false);
    }),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const groupe = interaction.options.get("groupe").value.toString();
        const dashboardUrl = process.env.DASHBOARD_URL;
        var date = "";
        if (interaction.options.get("date") === null) {
            const nowDate = new Date();
            date = nowDate.toLocaleDateString();
        }
        else {
            date = interaction.options.get("date").value.toString();
        }
        let embedDescription = `Liste des cours: \n`;
        fetch(dashboardUrl + '/api/edt/class/day/' + groupe + "/" + date).then(response => {
            response.json().then(json => {
                if (json.length == 0) {
                    embedDescription += `*Aucun cours aujourd'hui*`;
                }
                let index = 0;
                while (index < json.length) {
                    const startDate = new Date(json[index]['dtstart']);
                    const endDate = new Date(json[index]['dtend']);
                    //■ [1488] WEBER MARIE LAURE Intro GSI - 08:30/10:30
                    embedDescription += `■ **${json[index]['name']}** - \`${startDate.getHours()}:${startDate.getMinutes()}\`/\`${endDate.getHours()}:${endDate.getMinutes()}\` \n`;
                    index++;
                }
                (0, consoleManager_1.sendDebug)(embedDescription);
                interaction.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setTitle(`📚 Cours du (${date}})`)
                            .setAuthor({
                            name: "Discord EDT UM"
                        })
                            .setDescription(embedDescription)
                            .setColor("Purple")
                    ]
                });
            });
        });
    })
};
