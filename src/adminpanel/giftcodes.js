import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";

export default function() {
    let giftCodesDB = new DynamicPropertyDatabase("Gift");
    uiManager.addUI("Azalea2.2/Gift/Redeem", (player, invalid_code = false) => {
        let modal = new ModalForm();
        modal.title("Redeem Gift Code");
        let codes = giftCodesDB.get("codes", []);
        modal.textField(invalid_code ? "Code §c§o[Error: Invalid Code]" : "Code", "Type a code to redeem");
        modal.show(player, false, (player, response)=>{
            let code = response.formValues[0];
            let codeToRedeem = codes.find(code2=>{
                if(!code2.caseSensitive) {
                    return code2.code.toLowerCase() == code.toLowerCase();
                } else {
                    return code2.code == code;
                }
            });
            if(!codeToRedeem || (codeToRedeem.useOnce && player.hasTag(`code_used:${codeToRedeem.code}`))) return uiManager.open("Azalea2.2/Gift/Redeem", player, true);
            player.runCommand(codeToRedeem.command.startsWith('/') ? codeToRedeem.command.substring(1) : codeToRedeem.command);
            player.sendMessage(`§aSuccessfully redeemed code!`)
            if(codeToRedeem.useOnce) {
                player.addTag(`code_used:${codeToRedeem.code}`)
            }
        })
        
    })
    uiManager.addUI("Azalea2.2/Gift/Add", (player, index = -1) => {
        let modal = new ModalForm();
        modal.title("Add Gift Code");
        let codes = giftCodesDB.get("codes", []);
        modal.textField("Code", "Type a gift code", index >= 0 ? codes[index].code : undefined);
        modal.textField("Command", "Run this when code is typed", index >= 0 ? codes[index].command : undefined);
        modal.toggle("Case sensitive?", index >= 0 ? codes[index].caseSensitive : false);
        modal.toggle("Can only use once?", index >= 0 ? codes[index].useOnce : false);
        modal.show(player, null, (player, response) => {
            if(!response.formValues[0]) return uiManager.open("Azalea2.2/Gift/Add", player, index);
            if(!response.formValues[1]) return uiManager.open("Azalea2.2/Gift/Add", player, index);
            if(codes.find(_=>_.code.toLowerCase() == response.formValues[0].toLowerCase()) && index == -1) return uiManager.open("Azalea2.2/Gift/Add", player, index);
            if(index == -1) {
                codes.push({
                    code: response.formValues[0],
                    command: response.formValues[1],
                    caseSensitive: response.formValues[2],
                    useOnce: response.formValues[3],
                });
                giftCodesDB.set("codes", codes);
                uiManager.open("Azalea2.2/Gift/Root", player);
            } else {
                codes[index] ={
                    code: response.formValues[0],
                    command: response.formValues[1],
                    caseSensitive: response.formValues[2],
                    useOnce: response.formValues[3],
                };
                giftCodesDB.set("codes", codes);
                uiManager.open("Azalea2.2/Gift/Root", player);
            }
        })
    });
    uiManager.addUI("Azalea2.2/Gift/Root", player => {
        let form = new ActionForm();
        form.title("Gift Codes");
        form.button(`§aAdd Gift Code\n§7Adds a gift code`, `textures/azalea_icons/1`, (player)=>{
            uiManager.open("Azalea2.2/Gift/Add", player);
        });
        let codes = giftCodesDB.get("codes", []);
        for(let i = 0;i < codes.length;i++) {
            let code = codes[i];
            form.button(`§6${code.code}\n§7/${code.command.startsWith('/') ? code.command.substring(1) : code.command}`, `textures/azalea_icons/confetti`, (player)=>{
                uiManager.open("Azalea2.2/Gift/Add", player, i);
            })
        }
        form.show(player, false, (_player)=>{})
    })
    return new ConfiguratorSub("§6Gift Codes", `textures/azalea_icons/confetti`)
        .setCallback((player)=>{
            uiManager.open("Azalea2.2/Gift/Root", player);
        })
}