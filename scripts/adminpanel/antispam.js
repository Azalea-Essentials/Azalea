import {
	commands as o
} from "../commands";
import {
	ConfiguratorSub as r
} from "../configuratorOptions";
import {
	ModalForm as n
} from "../form_func";
export const COOLDOWN = function() {
	return new r("Cooldowns").setCallback((r => {
		let t = new n;
		for (const r of o._cmds) t.slider(`!${r.name}`, 1, 10, 1, 1, ((o, r) => {}));
		t.show(r, !1, ((o, r) => {}))
	}))
};