import{system as e,world as o}from"@minecraft/server";export default function r(r){r.addCommand("rank",{description:"Add / remove ranks",category:"Management",admin:!0,onRun(r,a,n,t){if(a.length)if("add"==a[0]){let r=a[1].replace(/_/g," "),l=a.slice(2).join(" ");for(let a of o.getPlayers())a.name.toLowerCase()==r.toLowerCase()&&(e.run((()=>a.addTag(`rank:${l}`))),t(`TEXT ${n.infoColor}Added rank: ${n.defaultRankColor}${l} §r${n.infoColor}to ${r}`))}else if("remove"==a[0]){let r=a[1].replace(/_/g," "),l=a.slice(2).join(" ");for(let a of o.getPlayers())a.name.toLowerCase()==r.toLowerCase()&&(a.hasTag(`rank:${l}`)?(e.run((()=>a.removeTag(`rank:${l}`))),t(`TEXT ${n.infoColor}Removed rank: ${n.defaultRankColor}${l} §r${n.infoColor}from ${r}`)):t("ERROR Player does not have that rank! Remember that ranks are case sensitive and color code sensitive."))}}})}