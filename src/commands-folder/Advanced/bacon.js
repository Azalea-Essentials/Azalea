import { CommandBuilder } from '../../commandBuilder';
import {world} from "@minecraft/server";

export default function lore() {
    new CommandBuilder("bacon")
        .desc("bacondev")
        .category("b00b s3x")
        .callback(({})=>{
            world.sendMessage("As a wise bacondevsb once said... b00b s3x...");
        })
        .register();
}