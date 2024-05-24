
export function clear(inventory, itemToClear, amount) {
    let container = inventory.container;
    let total = 0;
    for(let i = 0;i < container.size;i++) {
        let item = container.getItem(i);
        if(!item) continue;
        if(item.typeId == itemToClear) {
            total += item.amount
        }
    }
    let cleared = 0;
    if(total >= amount) {
        for(let i = 0;i < container.size;i++) {
            let item = container.getItem(i);
            if(!item) continue;
            if(item.amount <= 0) return;
            // world.sendMessage(`${amount}, ${item.amount}`);
            if(item.typeId == itemToClear) {
                if(amount == item.amount) {
                    container.setItem(i);
                    amount = 0;
                    cleared = amount;
                } else if(amount > item.amount) {
                    container.setItem(i);
                    amount -= item.amount;
                    cleared += item.amount;
                } else if(amount < item.amount) {
                    cleared = amount;
                    item.amount -= amount;
                    amount = 0;

                    container.setItem(i, item);
                }
            }
        }
        return [false, 0];
    } else {
        return [true, 1];
    }
    // world.sendMessage(`Cleared ${cleared}`)
}