import{world as e}from"@minecraft/server";import{baseConfigMenu as t}from"../configuratorOptions";import{Database as a}from"../db";export default function s(s){s.addCommand("azaleabot",{description:"Azalea Bot",category:"Azalea-Bot Communication",async onRun(s,r,i,n){if(!s.sender.hasTag("azalea-bot"))return;let o=function(e){var t=/[^\s"]+|"([^"]*)"/gi,a=[];do{var s=t.exec(e);null!=s&&a.push(s[1]?s[1]:s[0])}while(null!=s);return a}(r.join(" ")).map((e=>e.replaceAll("^q",'"')));if(e.sendMessage(`§d!azaleabot §r${o.join("§a§l, §r")}`),"db"==o[0]){let e=new a(o[1]),t=o[2];if("keys"==o[3])n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:e.keys()})}`);else if("set"==o[3])e.set(o[4],o[5]),n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:{error:!1}})}`);else if("get"==o[3]){let a=e.get(o[4]);n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:a})}`)}else"append"==o[3]?(e.set(o[4],`${e.get(o[4])}${o[5]}`),n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:{error:!1}})}`)):"delete"==o[3]&&(e.delete(o[4]),n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:{error:!1}})}`))}else if("form-test"==o[0]){let e=o[1];n(`TEXT ${JSON.stringify({reqID:e,type:"AzaleaDbResponse",data:{error:!1}})}`)}else if("cfg-options"==o[0]){let e=o[1];n(`TEXT ${JSON.stringify({reqID:e,type:"AzaleaDbResponse",data:t})}`)}else if("db-tables"==o[0]){let t=e.scoreboard.getObjectives().filter((e=>e.id.startsWith("db-"))).map((e=>e.id.substring(3))),a=o[1];n(`TEXT ${JSON.stringify({reqID:a,type:"AzaleaDbResponse",data:t})}`)}else if("nick"==o[0]){let e=o[1];for(const e of s.sender.getTags())e.startsWith("nick:")&&s.sender.removeTag(e);s.sender.addTag(`nick:${o[2]}`),n(`TEXT ${JSON.stringify({reqID:e,type:"AzaleaDbResponse",data:{error:!1}})}`)}else if("reset-nick"==o[0]){let e=o[1];for(const e of s.sender.getTags())e.startsWith("nick:")&&s.sender.removeTag(e);n(`TEXT ${JSON.stringify({reqID:e,type:"AzaleaDbResponse",data:{error:!1}})}`)}else if("list-players"==o[0]){let t=o[1],a=[];for(const t of e.getPlayers())a.push({name:t.name,tags:t.getTags()});n(`TEXT ${JSON.stringify({reqID:t,type:"AzaleaDbResponse",data:a})}`)}}})}