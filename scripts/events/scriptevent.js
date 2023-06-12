import { world } from '@minecraft/server';
import * as mc from '@minecraft/server';
export function scriptEvent(events) {
  return {
    name: "script-event",
    onRun(data) {
      console.warn(data.message);
    }
  };
}