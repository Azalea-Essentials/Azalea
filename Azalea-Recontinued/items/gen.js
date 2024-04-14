const fs = require('node:fs');
let json = `{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "azalea:bindable_<NUM>"
		},
		"components": {
			"minecraft:can_destroy_in_creative": false,
			"minecraft:allow_off_hand": false,
			"minecraft:display_name": {
				"value": "§cBindable <NUM>"
			},
			"minecraft:max_stack_size": 1,
			"minecraft:icon": {
				"texture": "bindable_<NUM>"
			},
            "minecraft:foil": false
		}
	}
}`

for(let i = 0;i < 31;i++) {
    let num = i+1;
    fs.writeFile(`bindable_${num}.json`, json.replace(/\<NUM\>/g, num.toString()), err=>{

    })
}