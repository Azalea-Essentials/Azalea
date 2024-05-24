import { ItemStack, world } from "@minecraft/server";

export const customCommandsActions = [
    {
        ingameName: "\uE129 Give tag",
        id: "GIVE_TAG",
        params: [
            {
                "type": "text",
                "label": "Tag",
                "placeholder": "Type a tag to give to a player"
            }
        ],
        cb(tagInput, player) {
            player.addTag(tagInput);
        }
    },
    {
        ingameName: "\uE129 Toggle tag",
        id: "TOGGLE_TAG",
        params: [
            {
                "type": "text",
                "label": "Tag",
                "placeholder": "Type a tag to give to a player"
            }
        ],
        cb(tagInput, player) {
            if(!player.hasTag(tagInput))
                player.addTag(tagInput);
            else
                player.removeTag(tagInput)
        }
    },
    {
        ingameName: "\uE129 Remove tag",
        id: "REMOVE_TAG",
        params: [
            {
                "type": "text",
                "label": "Tag",
                "placeholder": "Type a tag to remove from a player"
            }
        ],
        cb(tagInput, player) {
            player.removeTag(tagInput)
        }
    },
    {
        ingameName: "\uE11C Run command",
        id: "RUN_COMMAND",
        params: [
            {
                "type": "text",
                "label": "Run",
                "placeholder": "Type a command to run"
            }
        ],
        cb(cmd, player) {
            player.runCommand(cmd);
        }
    },
    {
        ingameName: "\uE11B Azalea command response",
        id: "COMMAND_RESPONSE",
        params: [
            {
                "type": "text",
                "label": "Raw command response",
                "placeholder": "dont mess this up"
            }
        ],
        cb(responseRaw, response) {
            response(responseRaw);
        }
    },
    {
        ingameName: "\uE127 Give item",
        id: "GIVE_ITEM",
        params: [
            {
                type: "text",
                label: "Item ID",
                placeholder: "Type an item ID"
            },
            {
                type: "text",
                label: "Item amount",
                placeholder: "Type the amount"
            }
        ],
        cb(id, amount, player) {
            let item = new ItemStack(id, parseInt(amount));
            let inventory = player.getComponent('inventory');
            let container = inventory.container;
            container.addItem(item);
        }
    },
    {
        ingameName: "\uE129 Give tag to other player",
        id: "GIVE_TAG_TO_OTHER",
        params: [
            {
                type: "text",
                label: "Tag",
                placeholder: "Type the tag"
            },
            {
                type: "text",
                label: "Player",
                placeholder: "Player name, usually $1 for first arg"
            }
        ],
        cb(tag, otherPlayer, response) {
            let otherPlayerData;
            for(const player of world.getPlayers()) {
                if(player.name.toLowerCase() == otherPlayer.toLowerCase()) otherPlayerData = player;
            }
            if(!otherPlayerData) return response(`ERROR Player not found!`)
            otherPlayerData.addTag(tag);
        }
    },
    {
        ingameName: "\uE129 Remove tag from other player",
        id: "REMOVE_TAG_FROM_OTHER",
        params: [
            {
                type: "text",
                label: "Tag",
                placeholder: "Type the tag"
            },
            {
                type: "text",
                label: "Player",
                placeholder: "Player name, usually $1 for first arg"
            }
        ],
        cb(tag, otherPlayer, response) {
            let otherPlayerData;
            for(const player of world.getPlayers()) {
                if(player.name.toLowerCase() == otherPlayer.toLowerCase()) otherPlayerData = player;
            }
            if(!otherPlayerData) return response(`ERROR Player not found!`)
            otherPlayerData.removeTag(tag);
        }
    },
    {
        ingameName: "\uE129 Toggle tag to other player",
        id: "TOGGLE_TAG_TO_OTHER",
        params: [
            {
                type: "text",
                label: "Tag",
                placeholder: "Type the tag"
            },
            {
                type: "text",
                label: "Player",
                placeholder: "Player name, usually $1 for first arg"
            }
        ],
        cb(tag, otherPlayer, response) {
            let otherPlayerData;
            for(const player of world.getPlayers()) {
                if(player.name.toLowerCase() == otherPlayer.toLowerCase()) otherPlayerData = player;
            }
            if(!otherPlayerData) return response(`ERROR Player not found!`)
            if(otherPlayerData.hasTag(tag))
                otherPlayerData.removeTag(tag)
            else
                otherPlayerData.addTag(tag);
        }
    },
    {
        ingameName: "\uE11B Azalea conditional response",
        id: "CONDITIONAL_RESPONSE",
        params: [
            {
                type: "text",
                label: "condition",
                placeholder: "type a condition"
            },
            {
                type: "text",
                label: "response",
                placeholder: "type a response"
            }
        ],
        cb(condition,responseRaw,response) {
            let conditions = condition.split(',').map(_=>_.trim());
            let pass = true;
            for(const condition of conditions) {
                switch(condition.split(' ')[0]) {
                    case "player_online":
                        if(!(world.getPlayers().find(_=>_.name.toLowerCase() == condition.split(' ').slice(1).join(' ').toLowerCase()))) pass = false;
                        break;
                }
            }
            if(pass) {
                response(responseRaw);
            }
        }
    }
]