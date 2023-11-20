import { CommandBuilder } from "../commandBuilder";
import { uiManager } from "../uis";

export default function payCommand() {
    new CommandBuilder("pay")
        .desc("Pay money")
        .category("Economy")
        .callback(({msg,args, response})=>{
            uiManager.open("Azalea0.9.1/MoneyTransfer", msg.sender);
            return response("SUCCESS Close chat to show UI")
        })
        .register();
}