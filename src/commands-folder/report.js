import { world } from '@minecraft/server';

import { CommandBuilder } from '../commandBuilder';
import { Database } from '../db';
import { ModalForm } from '../form_func';
import { uiManager } from '../uis';

export default function() {
    uiManager.addUI("AzaleaExtra/Report",(player)=>{
        let config = new Database("Config");
        let defaultReasons = "Hacking, Toxicity";
        let reportReasons = config.get("ReportReasons", defaultReasons).split(',').map(_=>_.trim());
        if(!config.get("ReportReasons")) config.set("ReportReasons", defaultReasons);
        let reportsDb = new Database("Reports");
        let reports = reportsDb.get("Reports", []);

        let players = world.getPlayers();
        let playerNames = players.map(_=>_.name);

        let form = new ModalForm()
            .title("Title")
            .dropdown("Player", playerNames.map(_=>{
                return {
                    "callback":()=>{},
                    "option": _
                }
            }), 0, ()=>{})
            .dropdown("Reason", reportReasons.map(_=>{
                return {
                    "callback":()=>{},
                    "option": _
                }
            }), 0, ()=>{})
            .show(player, true, (player, response)=>{
                reports.push({
                    player: playerNames[response.formValues[0]],
                    reason: reportReasons[response.formValues[1]]
                });
                reportsDb.set("Reports", reports);
            })

    })
    new CommandBuilder("report")
        .category("Security")
        .desc("Report a player")
        .callback(({msg, response})=>{
            let config = new Database("Config");
            let defaultReasons = "Hacking, Toxicity";
            let reportReasons = config.get("ReportReasons", defaultReasons).split(',').map(_=>_.trim());
            if(!config.get("ReportReasons")) config.set("ReportReasons", defaultReasons);
            let reportsDb = new Database("Reports");
            let reports = reportsDb.get("Reports", []);

            let players = world.getPlayers();
            let playerNames = players.map(_=>_.name);

            let form = new ModalForm()
                .title("Title")
                .dropdown("Player", playerNames.map(_=>{
                    return {
                        "callback":()=>{},
                        "option": _
                    }
                }), 0, ()=>{})
                .dropdown("Reason", reportReasons.map(_=>{
                    return {
                        "callback":()=>{},
                        "option": _
                    }
                }), 0, ()=>{})
                .show(msg.sender, true, (player, response)=>{
                    reports.push({
                        player: playerNames[response.formValues[0]],
                        reason: reportReasons[response.formValues[1]]
                    });
                    reportsDb.set("Reports", reports);
                })
            response(`SUCCESS Exit the chat menu!`);
        })
        .register()
}