import*as e from"@minecraft/server";import{Database as a}from"./db";import{formatStr as t}from"./utils/AzaleaFormatting";export const defaultNicknameFormat="§8[<rank>§r§8] §7<name>\\n§2<hp>§7/§a<hp_max>";export function NicknamesModule(){let r=new a("Config");e.system.runInterval((()=>{let a="true"==r.get("ImprovedNametagsEnabled");for(const m of e.world.getPlayers())if(a){let e=r.get("NicknameFormat",defaultNicknameFormat);e||(e=defaultNicknameFormat),m.nameTag=t(e.replace(/\\n/g,"\n"),m)}else m.nameTag=m.name}),80)}