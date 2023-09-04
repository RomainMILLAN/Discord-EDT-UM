import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { sendDebug } from "../manager/consoleManager";
import sentry from "../manager/sentry";

export const command: SlashCommand = {
    name: "edt",
    data: new SlashCommandBuilder()
        .setName("edt")
        .setDescription("Affiche l'emploi du temp d'un groupe")
        .addStringOption((option) => {
            return option
                .setName("groupe")
                .setDescription("Classe de l'emploi du temp")
                .setRequired(true)
                .addChoices(
                    {
                        name: "INFO S6",
                        value: "1"
                    },
                    {
                        name: "INFO Q5",
                        value: "2"
                    },
                    {
                        name: "INFO G5",
                        value: "3"
                    },
                )
        })
        .addStringOption((option) => {
            return option
                .setName("date")
                .setDescription("Date de l'emploi du temp")
                .setRequired(false)
        }),
    execute: async (interaction) => {
        const groupe = interaction.options.get("groupe").value.toString();
        const dashboardUrl = process.env.DASHBOARD_URL;
        var date = "";

        if(interaction.options.get("date") === null) {
            const nowDate = new Date();
            date = nowDate.getDate() + '/' + (nowDate.getMonth()+1) + '/' + nowDate.getFullYear();
        }else {
            date = interaction.options.get("date").value.toString();
        }
        let embedDescription = `Liste des cours: \n`

        let url = dashboardUrl + '/api/edt/class/day/' + groupe + "/" + date
        sendDebug(url);
        fetch(url).then(response => {
            response.json().then(json => {

                if(json.length == 0) {
                    embedDescription += `*Aucun cours aujourd'hui*`
                }

                let index = 0;
                while(index < json.length) {
                    const startDate = new Date(json[index]['dtstart']);
                    const endDate = new Date(json[index]['dtend']);
                    //■ [1488] WEBER MARIE LAURE Intro GSI - 08:30/10:30
                    embedDescription += `■ **${json[index]['name']}** - \`${startDate.getHours()}:${startDate.getMinutes()}\`/\`${endDate.getHours()}:${endDate.getMinutes()}\` \n`;

                    index++;
                }

                sendDebug(embedDescription);
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`📚 Cours du (${date})`)
                            .setAuthor({
                                name: "EDT UM"
                            })
                            .setDescription(embedDescription)
                            .setColor("Purple")
                    ],
                    ephemeral: true
                })
            })
        })
    }
}