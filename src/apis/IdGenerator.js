import { Database as DatabaseLegacy } from "../db";

class IDGenerator {
    constructor() {
        this.incrementalIdDatabase = new DatabaseLegacy("IncrementalIDs");
    }
    generateIncrementalID(key, startingNumber = 0) {
        let num = this.incrementalIdDatabase.get(key, `NUM:${startingNumber}`);
        if (!num)
            num = `NUM:${startingNumber}`;
        num = parseInt(num.substring(4));
        let num2 = num + 1;
        this.incrementalIdDatabase.set(key, `NUM:${num2.toString()}`);
        return num;
    }
    generateTimeID() {
        return Date.now();
    }
}
export const idGenerator = new IDGenerator();
