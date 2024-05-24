import { world } from '@minecraft/server';

import { CommandBuilder } from '../../commandBuilder';

import { Database } from '../../db';
import { uiManager } from '../../uis';

export default function() {
    uiManager.addUI("AzaleaExtra/Report",()=>{
        let config = new Database("Config");
        let defaultReasons = "Hacking, Toxicity";
        if(!config.get("ReportReasons")) config.set("ReportReasons", defaultReasons);



    })
    new CommandBuilder("report")
        .category("Security")
        .desc("Report a player")
        .callback(({response})=>{
            let config = new Database("Config");
            let defaultReasons = "Hacking, Toxicity";
            if(!config.get("ReportReasons")) config.set("ReportReasons", defaultReasons);


            response(`SUCCESS Exit the chat menu!`);
        })
        .register()
}