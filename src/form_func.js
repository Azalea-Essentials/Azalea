import {
  Player,
  world,
} from '@minecraft/server';
import {
  ActionFormData,
  ActionFormResponse,
  FormCancelationReason,
  MessageFormData,
  MessageFormResponse,
  ModalFormData,
  ModalFormResponse,
} from '@minecraft/server-ui';

export const content = {
	warn(...messages) {
		// console.warn(messages.map(message => JSON.stringify(message, (key, value) => (value instanceof Function) ? '<f>' : value)).join(' '));
	},
	chatFormat(...messages) {
		world.say(messages.map(message => JSON.stringify(message, (key, value) => (value instanceof Function) ? value.toString().replaceAll('\r\n', '\n') : value, 4)).join(' '));
	}
};
function isNumberDefined(input) {
	return (input !== false && input !== null && input !== undefined && input !== NaN && input !== Infinity);
}
export class MessageForm {
	constructor() {
		this.form = new MessageFormData();
		this.callbacks = [null, null];
	}
	/**
	 * @method title
	 * @param {String} titleText 
	 * @returns {MessageForm}
	 */
	title(titleText) {
		if (typeof titleText !== 'string') throw new Error(`titleText: ${titleText}, at params[0] is not a String!`);
		this.form.title(titleText);
		return this;
	}
	/**
	 * @method body
	 * @param {String} bodyText 
	 * @returns {MessageForm}
	 */
	body(bodyText) {
		if (typeof bodyText !== 'string') throw new Error(`bodyText: ${titleText}, at params[0] is not a String!`);
		this.form.body(bodyText);
		return this;
	}
	/**
	 * @method button1
	 * @param {String} text 
	 * @param {(player: Player, i: Number) => {}} callback 
	 * @returns {MessageForm}
	 */
	button1(text, callback) {
		if (typeof text !== 'string') throw new Error(`text: ${label}, at params[0] is not a String!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[1] is defined and is not a Function!`);
		this.callbacks[1] = callback;
		this.form.button1(text);
		return this;
	}
	/**
	 * @method button2
	 * @param {String} text 
	 * @param {(player: Player, i: Number) => {}} callback 
	 * @returns {MessageForm}
	 */
	button2(text, callback) {
		if (typeof text !== 'string') throw new Error(`text: ${label}, at params[0] is not a String!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[1] is defined and is not a Function!`);
		this.callbacks[0] = callback;
		this.form.button2(text);
		return this;
	}
	/**
	 * @method show
	 * @param {Player} player 
	 * @param {Boolean} awaitNotBusy 
	 * @param {(player: Player, response: MessageFormResponse) => {}} callback?
	 * @returns {Promise<MessageFormResponse>}
	 */
	async show(player, awaitNotBusy = false, callback) {
		try {


			if (!(player instanceof Player)) player = player?.player;
			if (!(player instanceof Player)) throw new Error(`player at params[0] is not a Player!`);
			if (awaitNotBusy && typeof awaitNotBusy !== 'boolean') throw new Error(`awaitNotBusy at params[1] is not a Boolean!`);
			if (callback && !(callback instanceof Function)) throw new Error(`callback at params[2] is not a Function!`);
			let response;
			while (true) {
				response = await this.form.show(player);
				const { cancelationReason } = response;
				if (!awaitNotBusy || cancelationReason !== 'userBusy') break;
			}
			const { selection } = response;
			const callbackIndex = this.callbacks[selection];
			if (callbackIndex instanceof Function) callbackIndex(player, selection);
			if (callback instanceof Function) callback(player, response);
			return response;
		} catch (error) {
			console.log(error, error.stack);
		}
	}
}
export class ActionForm {
	constructor() {
		this.form = new ActionFormData();
		this.callbacks = [];
		this.titleText = "";
	}
	/**
	 * @method title
	 * @param {String} titleText 
	 * @returns {ActionForm}
	 */
	title(titleText) {
		if (typeof titleText !== 'string') throw new Error(`titleText: ${titleText}, at params[0] is not a String!`);
		this.titleText = `§r${titleText}`;
		this.form.title(titleText)
		return this;
	}
	/**
	 * @method body
	 * @param {String} bodyText 
	 * @returns {ActionForm}
	 */
	body(bodyText) {
		if (typeof bodyText !== 'string') throw new Error(`bodyText: ${titleText}, at params[0] is not a String!`);
		this.form.body(bodyText);
		return this;
	}
	/**
	 * @method body
	 * @param {String} text 
	 * @param {String} iconPath 
	 * @param {(player: Player, i: Number) => {}} callback 
	 * @returns {ActionForm}
	 */
	button(text, iconPath, callback) {
		if (typeof text !== 'string') throw new Error(`text: ${label}, at params[0] is not a String!`);
		if (iconPath && typeof iconPath !== 'string') throw new Error(`iconPath: ${defaultValue}, at params[1] is defined and is not a String!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[2] is defined and is not a Function!`);
		this.callbacks.push(callback);
		this.form.button(text, iconPath);
		return this;
	}
	/**
	 * @method show
	 * @param {Player} player 
	 * @param {Boolean} awaitNotBusy 
	 * @param {(player: Player, response: ActionFormResponse) => {}} callback?
	 * @returns {Promise<ActionFormResponse>}
	 */
	async show(player, awaitNotBusy = false, callback) {
		awaitNotBusy = true;
		if(player.hasTag("light-mode"))
			this.title(`§l§i§g§h§t§r§8${this.titleText.replace(/§r/g,"§r§8")}`);
		try {
			if (!(player instanceof Player)) player = player?.player;
			if (!(player instanceof Player)) throw new Error(`player at params[0] is not a Player!`);
			if (awaitNotBusy && typeof awaitNotBusy !== 'boolean') throw new Error(`awaitNotBusy at params[1] is not a Boolean!`);
			if (callback && !(callback instanceof Function)) throw new Error(`callback at params[2] is not a Function!`);
			let response;
			while (true) {
				response = await this.form.show(player);
				const { cancelationReason } = response;
				if (!awaitNotBusy || cancelationReason !== 'userBusy') break;
			}
			const { selection } = response;
			const callbackIndex = this.callbacks[selection];
			if (callbackIndex instanceof Function) callbackIndex(player, selection);
			if (callback instanceof Function) callback(player, response);
			return response;
		} catch (error) {
			console.log(error, error.stack);
		}
	}
}

export class ModalForm {
	constructor() {
		this.form = new ModalFormData();
		this.callbacks = [];
		this.titleText = "";
	}
	/**
	 * @method title
	 * @param {String} titleText 
	 * @returns {ModalForm}
	 */
	submitButton(text) {
		this.form.submitButton(text);
	}
	title(titleText) {
		if (typeof titleText !== 'string') throw new Error(`titleText: ${titleText}, at params[0] is not a String!`);
		this.titleText = titleText;
		this.form.title(titleText);
		return this;
	}
	/**
	 * @method toggle
	 * @param {String} label 
	 * @param {Boolean} defaultValue? 
	 * @param {(player: Player, state: Boolean, i: number) => {}} callback?
	 */
	toggle(label, defaultValue, callback) {
		if (typeof label !== 'string') throw new Error(`label: ${label}, at params[0] is not a String!`);
		if (defaultValue && typeof defaultValue !== 'boolean') throw new Error(`defaultValue: ${defaultValue}, at params[1] is defined and is not a String!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[2] is defined and is not a Function!`);
		this.callbacks.push(callback);
		this.form.toggle(label, defaultValue);
		return this;
	}
	/**
	 * @typedef {Array<optionObject>} dropdownOptions
	 */

	/**
	 * @typedef {object} optionObject
	 * @property {string} option
	 * @property {(player: Player) => { }} callback 
	 */

	/**
	 * @method dropdown
	 * @param {String} label 
	 * @param {dropdownOptions} options 
	 * @param {Number} defaultValueIndex?
	 * @param {(player: Player, selection: Number, i: number) => {}} callback?
	 */
	dropdown(label, options, defaultValueIndex = 0, callback) {
		if (typeof label !== 'string') throw new Error(`label: ${label}, at params[0] is not a String!`);
		if (!(options instanceof Array)) throw new Error(`params[1] is not an Array!`);
		options.forEach((object, i) => { if (!(object instanceof Object)) throw new Error(`index: ${i}, in params[1] is not an Object!`); });
		const optionStrings = options.map(({ option }, i) => { if (typeof option !== 'string') throw new Error(`property option: ${option}, at index: ${i}, in params[1] is not a String!`); return option; });
		const optionCallbacks = options.map(({ callback }) => { if (callback && !(callback instanceof Function)) throw new Error(`property callback at index: ${i}, in params[1] is not a Function!`); else if (callback) return callback; });
		if (!isNumberDefined(defaultValueIndex) && !Number.isInteger(defaultValueIndex)) throw new Error(`defaultValueIndex: ${defaultValueIndex}, at params[2] is defined and is not an Integer!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[3] is defined and is not a Function!`);
		this.callbacks.push([optionCallbacks, callback]);
		this.form.dropdown(label, optionStrings, defaultValueIndex);
		return this;
	}
	/**
	 * @method slider
	 * @param {String} label 
	 * @param {Number} minimumValue 
	 * @param {Number} maximumValue 
	 * @param {Number} valueStep 
	 * @param {Number} defaultValue?
	 * @param {(player: Player, selection: Number, i: number) => {}} callback?
	 */
	slider(label, minimumValue, maximumValue, valueStep, defaultValue = null, callback) {
		if (typeof label !== 'string') throw new Error(`label: ${label}, at params[0] is not a String!`);
		if (typeof minimumValue !== 'number') throw new Error(`minimumValue: ${minimumValue}, at params[1] is not a Number!`);
		if (typeof maximumValue !== 'number') throw new Error(`maximumValue: ${maximumValue}, at params[2] is not a Number!`);
		if (typeof valueStep !== 'number') throw new Error(`valueStep: ${valueStep}, at params[3] is not a Number!`);
		if (!isNumberDefined(defaultValue) && typeof defaultValue !== 'number') throw new Error(`defaultValue: ${defaultValue}, at params[4] is defined and is not a Number!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[5] is defined and is not a Function!`);
		this.callbacks.push(callback);
		this.form.slider(label, minimumValue, maximumValue, valueStep, defaultValue);
		return this;
	}
	/**
	 * @method textField
	 * @param {String} label 
	 * @param {String} placeholderText 
	 * @param {String} defaultValue 
	 * @param {(player: Player, outputText: String, i: number) => {}} callback?
	 * @returns {ModalForm}
	 */
	textField(label, placeholderText, defaultValue = null, callback) {
		if (typeof label !== 'string') throw new Error(`label: ${label}, at params[0] is not a String!`);
		if (typeof placeholderText !== 'string') throw new Error(`placeholderText: ${placeholderText}, at params[1] is not a String!`);
		if (defaultValue && typeof defaultValue !== 'string') throw new Error(`defaultValue: ${defaultValue}, at params[2] is defined and is not a String!`);
		if (callback && !(callback instanceof Function)) throw new Error(`callback at params[3] is defined and is not a Function!`);
		this.callbacks.push(callback);
		this.form.textField(label, placeholderText, defaultValue);
		return this;
	};

	/**
	 * @method show
	 * @param {Player} player 
	 * @param {Boolean} awaitNotBusy?
	 * @param {(player: Player, response: ModalFormResponse) => {}} callback?
	 * @returns {Promise<ModalFormResponse>}
	 */
	async show(player, awaitNotBusy = false, callback) {
		if(player.hasTag("light-mode")) this.title(`§l§i§g§h§t§r§8${this.titleText.replace(/§r/g,"§r§8")}`)
		try {
			if (!(player instanceof Player)) player = player?.player;
			if (!(player instanceof Player)) throw new Error(`player at params[0] is not a Player!`);
			if (awaitNotBusy && typeof awaitNotBusy !== 'boolean') throw new Error(`awaitNotBusy at params[1] is not a Boolean!`);
			if (callback && !(callback instanceof Function)) throw new Error(`callback at params[2] is not a Function!`);
			let response;
			while (true) {
				response = await this.form.show(player);
				const { cancelationReason } = response;
				if (!awaitNotBusy || cancelationReason !== FormCancelationReason.UserBusy) break;
			}
			const { formValues, cancelationReason } = response;
			if (cancelationReason !== FormCancelationReason.UserClosed
				&& cancelationReason !== FormCancelationReason.UserBusy) response.formValues.forEach((value, i) => {
					if (this.callbacks[i] instanceof Array) {
						const callback = this.callbacks[i][0];
						const callbackAll = this.callbacks[i][1];
						if (callback instanceof Function) callback(player, i);
						if (callbackAll instanceof Function) callbackAll(player, value, i);
					} else {
						const callback = this.callbacks[i];
						if (callback instanceof Function) callback(player, value, i);
					}
				});
			if (callback instanceof Function) callback(player, response);
			return response;
		} catch (error) {
			console.warn(error, error.stack);
		}
	}
}
