import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import {
    ActionForm,
    MessageForm,
} from '../form_func';
import { uiManager } from '../uis';

export const PLAYER_REPORTS = function () {
    uiManager.addUI("Azalea0.9/ReportViewer", player => {
        let actionForm = new ActionForm();
        actionForm.body("Select a case");
        actionForm.title("Player reports");
        let reportsDb = new Database("Reports");
        let reports = reportsDb.get("Reports", []);
        let i = 0;
        if (!reports.length) {
            actionForm.button("§4No reports found, exit", null, () => { })
        }
        for (const report of reports) {
            i++;
            actionForm.button(`Case #${i}\n§8${report.player}, ${report.reason}`, null, (player, i) => {
                let messageForm = new MessageForm();
                messageForm.title(`Case #${i}`);
                messageForm.body(`Player reported: ${report.player}\nReason: ${report.reason}`);
                messageForm.button1("Ok", () => {
                    reports.splice(i, 1);
                    reportsDb.set("Reports", reports);
                });
                messageForm.button2("Delete", (_player) => { })
                messageForm.show(player, false, (_player) => { })
            });
        }
        actionForm.show(player, false, (_player) => { });
    })
    return new ConfiguratorSub("§cPlayer reports", "textures/azalea_icons/5")
        .setCallback(() => {

        })
}