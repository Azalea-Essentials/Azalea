import { CommandBuilder } from "../../commandBuilder";
import { clear } from "../../things/Clear";

export default function() {
    new CommandBuilder("clear")
        .desc("Clear dirt")
        .callback(({msg,args,theme,response})=>{
            let itemToClear = "minecraft:dirt";
            let amount = 78;
            let inventory = msg.sender.getComponent('inventory');
            clear(inventory, itemToClear, amount)
        })
}