import { world } from "@minecraft/server";

export function isDevServer() {
    return world.getPlayers().find(_=>_.name=="azaleadevbot") ? true : false;
}