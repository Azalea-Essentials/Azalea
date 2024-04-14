class EventManager {
    constructor() {
        this._events = [];
    }
    listen(name, callback) {
        this._events.push({
            name,
            callback
        })
    }
    emit(name, ...args) {
        this._events.forEach(event => {
            if(event.name != name) return;
            event.callback(...args);
        })
    }
    getAllListenersByName(name) {
        return this._events.filter(event => event.name == name);
    }
}
export const eventMgr = new EventManager();