import { commands } from '../commands';
import { itemToJson, jsonToItem } from '../conv';
export default function main() {
  commands.addCommand('item-to-json', {
    description: "Converts an item to JSON (DEV)",
    category: "DEV",
    async onRun(msg, args, theme, response) {
      let inventory = msg.sender.getComponent('inventory');
      let container = inventory.container;
      let item = container.getItem(msg.sender.selectedSlot);
      response(`TEXT ${item.getComponents().map(_ => _.typeId).join(', ')}`);
      let json = itemToJson(item);
      response(`TEXT ${JSON.stringify(json, null, 2)}`);
    }
  });
  commands.addCommand('json-to-item', {
    description: "Converts an item to JSON (DEV)",
    category: "DEV",
    async onRun(msg, args, theme, response) {
      let inventory = msg.sender.getComponent('inventory');
      let container = inventory.container;
      let item = container.getItem(msg.sender.selectedSlot);
      response(`TEXT ${item.getComponents().map(_ => _.typeId).join(', ')}`);
      let json = itemToJson(item);
      response(`TEXT ${JSON.stringify(json, null, 2)}`);
      response(`TEXT Now duplicating the item`);
      let item2 = jsonToItem(json);
      container.addItem(item2);
    }
  });
}