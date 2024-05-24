import { system } from "@minecraft/server";
class Tps {
    tps;
    constructor() {}
    getTps() {
        return this.tps;
    }
    updateTps(tps) {
        this.tps = tps;
    }
}

let tpsAmountData = [];

let lastTickLog = Date.now();

const tps = new Tps();
export { tps };

system.runInterval(async () => {
    const now = Date.now();
    tpsAmountData.push(now - lastTickLog);
    lastTickLog = Date.now();
    if (tpsAmountData.length > 20) tpsAmountData.shift();
    let tpsNow = 0;
    tpsAmountData.forEach((period) => (tpsNow += period));
    tps.updateTps((20 / 1000) * tpsNow);
});