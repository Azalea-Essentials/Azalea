import { world } from "@minecraft/server";
import { getScore } from "../utils/playerUtils";
import { Database } from "../db";

// Get the config database
let configDb = new Database("Config")

// Set the UI name
const UI_NAME = "Azalea0.9.1/MoneyTransfer";

uiManager.addUI(UI_NAME, (player, error = "NONE", defaultPlayerIndex = 0, defaultAmount = null) => {
    let form = new ModalForm();
    let players = [...world.getPlayers()];
    form.title("Money Transfer");
    form.dropdown("Select a player to send money to:", players.map(playerData => ({
        option: `${playerData.name}${isAdmin(playerData) ? ` [ ADMIN ]` : ``}`,
        callback() { }
    })), defaultPlayerIndex, () => { });
    let moneyCount = getScore(configDb.get("MoneyScoreboard", "money"), player);
    form.textField(`Type how much you want to send §7(MAX: $${moneyCount.toLocaleString()})§r§f:${error != "NONE" ? `\n§c[ERROR] ${error}` : ``}`, `Type any number`, defaultAmount, () => { });
    form.show(player, true, (player, response) => {
        if (response.canceled) return;
        if (!/^\d+$/.test(response.formValues[1])) return uiManager.open(UI_NAME, player, "The value entered is not a valid number.", response.formValues[0], response.formValues[1])
        let moneyScoreboard = configDb.get("MoneyScoreboard", "money");
        let moneyCount = getScore(moneyScoreboard, player);
        let valueToGive = parseInt(response.formValues[1])
        if (moneyCount < valueToGive) return uiManager.open(UI_NAME, player, `$${moneyCount.toLocaleString()} is not enough money to give $${valueToGive.toLocaleString()} to someone`, response.formValues[0], response.formValues[1])
        let otherPlayer = players[response.formValues[0]];
        let confirmation = new MessageForm();
        confirmation.title("Are you sure?");
        confirmation.body(`Are you sure you want to give $${valueToGive.toLocaleString()} to ${otherPlayer.name}?`);
        confirmation.button1("Yes", () => {
            player.sendMessage(`§cCanceled!`);
        })
        confirmation.button2("No", () => {
            let otherPlayerMoneyCount = getScore(moneyScoreboard, otherPlayer);
            try {
                otherPlayerMoneyCount = moneyScoreboard.getScore(otherPlayer.scoreboardIdentity);
                if (!otherPlayerMoneyCount) otherPlayerMoneyCount = 0;
            } catch { otherPlayerMoneyCount = 0; }
            moneyCount -= valueToGive;
            otherPlayerMoneyCount += valueToGive;
            if (otherPlayer.id != player.id) moneyScoreboard.setScore(player.scoreboardIdentity, moneyCount);
            if (otherPlayer.id != player.id) moneyScoreboard.setScore(otherPlayer.scoreboardIdentity, otherPlayerMoneyCount);
            otherPlayer.sendMessage(`§e@${player.name} §rhas transfered §a$${valueToGive.toLocaleString()} §rto you`)
            let confirmation2 = new MessageForm();
            confirmation2.title("SENT");
            confirmation2.body("Successfully sent money");
            confirmation2.button1("Ok")
            confirmation2.button2("Ok")
            confirmation2.show(player)
        })
        confirmation.show(player)
    });
});