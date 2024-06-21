import*as e from"@minecraft/server";const o={};import s from"./extensions\\sidebar.js";o.Sidebar=s;import t from"./extensions\\miscCommands.js";o.MiscCommands=t;import r from"./extensions\\formsv2.js";o.Formsv2=r;import i from"./extensions\\entityEditor.js";o.EntityEditor=i;import m from"./extensions\\dynamicSigns.js";o.DynamicSigns=m;import n from"./extensions\\customcommands.js";o.Customcommands=n;import a from"./extensions\\configurator.js";o.Configurator=a;import d from"./extensions\\command_detection.js";o.CommandDetection=d;import l from"./extensions\\combat_log.js";o.CombatLog=l;import c from"./extensions\\chest_guis.js";o.ChestGuis=c;import f from"./extensions\\blockEditor.js";o.BlockEditor=f;import{beforeChat as p}from"./beforeChat";import{commands as g}from"./commands";import{eventMgr as j}from"./eventManager";const h={};import u from"./commands-folder\\Advanced\\chatrankformat.js";h.Chatrankformat=u;import b from"./commands-folder\\Advanced\\bacon.js";h.Bacon=b;const v={};import w from"./commands-folder\\Azalea\\version.js";v.Version=w;import y from"./commands-folder\\Azalea\\credits.js";v.Credits=y;const E={};import S from"./commands-folder\\Converter\\pshopconvert.js";E.Pshopconvert=S;const C={};import P from"./commands-folder\\Dev\\test.js";C.Test=P;import M from"./commands-folder\\Dev\\invitestest.js";C.Invitestest=M;import x from"./commands-folder\\Dev\\dev.js";C.Dev=x;import U from"./commands-folder\\Dev\\cleartest.js";C.Cleartest=U;const k={};import I from"./commands-folder\\Economy\\shop.js";k.Shop=I;import z from"./commands-folder\\Economy\\redeem.js";k.Redeem=z;import B from"./commands-folder\\Economy\\pay.js";k.Pay=B;import T from"./commands-folder\\Economy\\bank.js";k.Bank=T;import D from"./commands-folder\\Economy\\baltop.js";k.Baltop=D;import _ from"./commands-folder\\Economy\\bal.js";k.Bal=_;const A={};import R from"./commands-folder\\Internal\\ab.js";A.Ab=R;const H={};import W from"./commands-folder\\Leaderboards\\addlb.js";H.Addlb=W;const L={};import O from"./commands-folder\\Misc\\teams.js";L.Teams=O;import F from"./commands-folder\\Misc\\tadpole.js";L.Tadpole=F;import V from"./commands-folder\\Misc\\speakas.js";L.Speakas=V;import G from"./commands-folder\\Misc\\rolldice.js";L.Rolldice=G;import N from"./commands-folder\\Misc\\realhack.js";L.Realhack=N;import $ from"./commands-folder\\Misc\\ping.js";L.Ping=$;import q from"./commands-folder\\Misc\\doggo.js";L.Doggo=q;import J from"./commands-folder\\Misc\\base64.js";L.Base64=J;const K={};import Q from"./commands-folder\\Moderation\\report.js";K.Report=Q;import X from"./commands-folder\\Moderation\\mute.js";K.Mute=X;import Y from"./commands-folder\\Moderation\\ban.js";K.Ban=Y;const Z={};import ee from"./commands-folder\\Preferences\\selecttheme.js";Z.Selecttheme=ee;import oe from"./commands-folder\\Preferences\\chest.js";Z.Chest=oe;const se={};import te from"./commands-folder\\Social\\what.js";se.What=te;import re from"./commands-folder\\Social\\vote.js";se.Vote=re;import ie from"./commands-folder\\Social\\profile.js";se.Profile=ie;import me from"./commands-folder\\Social\\party.js";se.Party=me;import ne from"./commands-folder\\Social\\msg.js";se.Msg=ne;import ae from"./commands-folder\\Social\\friends.js";se.Friends=ae;import de from"./commands-folder\\Social\\emojis.js";se.Emojis=de;const le={};import ce from"./commands-folder\\Utilities\\verify.js";le.Verify=ce;import fe from"./commands-folder\\Utilities\\toggle.js";le.Toggle=fe;import pe from"./commands-folder\\Utilities\\tagcmd.js";le.Tagcmd=pe;import ge from"./commands-folder\\Utilities\\staffchat.js";le.Staffchat=ge;import je from"./commands-folder\\Utilities\\setbindablename.js";le.Setbindablename=je;import he from"./commands-folder\\Utilities\\server-info.js";le.ServerInfo=he;import ue from"./commands-folder\\Utilities\\review.js";le.Review=ue;import be from"./commands-folder\\Utilities\\pwarp.js";le.Pwarp=be;import ve from"./commands-folder\\Utilities\\newHelp.js";le.NewHelp=ve;import we from"./commands-folder\\Utilities\\lore.js";le.Lore=we;import ye from"./commands-folder\\Utilities\\help.js";le.Help=ye;import Ee from"./commands-folder\\Utilities\\floatingtext.js";le.Floatingtext=Ee;import Se from"./commands-folder\\Utilities\\cls.js";le.Cls=Se;import Ce from"./commands-folder\\Utilities\\broadcast.js";le.Broadcast=Ce;import Pe from"./commands-folder\\Utilities\\bind.js";le.Bind=Pe;import Me from"./commands-folder\\Utilities\\announcements.js";le.Announcements=Me;import xe from"./commands-folder\\Utilities\\addrank.js";le.Addrank=xe;const Ue={};import ke from"./commands-folder\\Warps\\warp.js";Ue.Warp=ke;import Ie from"./commands-folder\\Warps\\spawn.js";Ue.Spawn=Ie;import ze from"./commands-folder\\Warps\\home.js";Ue.Home=ze;const Be={};import Te from"./uis_new\\rolesUI.js";Be.RolesUI=Te;import De from"./uis_new\\prismarineDB.js";Be.PrismarineDB=De;import _e from"./uis_new\\playerUI.js";Be.PlayerUI=_e;import{NicknamesModule as Ae}from"./nicknames";import"./leaderboardHandler";import"./legacyPlayerShopNoChestUI";import"./sellshop";import"./tpRequestUI";import"./leaderboardHandler";import{warps as Re}from"./warpsapi";import{permList as He}from"./isAdmin";const We={};import Le from"./events\\WarpScriptevent.js";We.WarpScriptevent=Le;import Oe from"./events\\TrashSkyblock.js";We.TrashSkyblock=Oe;import Fe from"./events\\speakas.js";We.Speakas=Fe;import Ve from"./events\\PlayerSpawned.js";We.PlayerSpawned=Ve;import Ge from"./events\\itemUseCommunityCenter.js";We.ItemUseCommunityCenter=Ge;import Ne from"./events\\initialize.js";We.Initialize=Ne;import $e from"./events\\heartbeat-main.js";We.HeartbeatMain=$e;import qe from"./events\\combatlog.js";We.Combatlog=qe;import Je from"./events\\chestShop.js";We.ChestShop=Je;import Ke from"./events\\bindablechangename.js";We.Bindablechangename=Ke;import Qe from"./events\\AzaleaOpenUi.js";We.AzaleaOpenUi=Qe;import Xe from"./events\\antispam.js";We.Antispam=Xe;import{Database as Ye}from"./db";import{uiManager as Ze}from"./uis";import"./iconExtension";import{world as eo}from"@minecraft/server";let oo=new Ye("Binds");eo.beforeEvents.itemUse.subscribe((e=>{let o=oo.get(e.itemStack.typeId);o&&system.run((()=>{e.source.runCommand(o)}))}));let so=new class{constructor(){this.binds=new Map,e.world.beforeEvents.itemUse.subscribe((e=>{"minecraft:player"==e.source.typeId&&this.binds.has(e.itemStack.typeId)&&(e.cancel=!0,this.binds.get(e.itemStack.typeId)(e.source))}))}setBind(e,o){this.binds.set(e,o)}removeBind(e){this.binds.has(e)&&this.binds.delete(e)}},to=new Map;class ro{#e;constructor(e){this.#e=e,this.bindManager=so}registerModule(e,o){j.emit("RegisterModule",{name:e,mainClass:o})}getFlag(e){return!!to.has(e)&&to.get(e)}setFlag(e,o){to.set(e,o)}}export const azalea=new class{#o;constructor(){this.extensions=[],this.#s(),this.#t(),this.#r(),this.#i(),this.#m(),this.#n(),this.#o=[],this.#a(),this.#d()}getExtension(){}#l(){let o=e.world.getDimension("overworld");try{system.run((()=>{eo.getDimension("overworld").runCommand("tickingarea add circle 0 -63 0 1 azalea_itemdb")}))}catch{}let s=o.spawnEntity("azalea:extension",{x:0,y:0,z:0}),t='world.sendMessage("Hello, world!")'.match(/.{1,32766}/g),r=new e.ItemStack("azalea:bindable_fish_01a");r.nameTag="THE WISE DATA FISH",r.setLore(t),s.getComponent("inventory").container.setItem(0,r),s.nameTag="azalea_ext:testing";try{let o=e.world.structureManager.get("azalea_ext:testing");o&&console.warn(e.world.structureManager.delete(o))}catch{}e.world.structureManager.createFromWorld("azalea_ext:testing",e.world.getDimension("minecraft:overworld"),new e.BlockVolume({x:-1,y:-1,z:-1},{x:1,y:1,z:1}),{includeBlocks:!1,includeEntities:!0}).saveToWorld(),s.triggerEvent("azalea:despawn"),s.nameTag="despawned"}#c(){let o=e.world.structureManager.getIds().filter((e=>e.startsWith("azalea_ext:")));if(o.length)for(const s of o){e.world.structureManager.place(s,e.world.getDimension("overworld"),{x:0,y:0,z:0});let o=e.world.getDimension("overworld").getEntities({name:s,type:"azalea:extension"});if(console.log(o.length),!o.length)continue;for(const s of o){let o=s.getComponent("inventory").container.getItem(0);console.warn(o.getLore());let t=o.getLore().join("");e.world.sendMessage(t),s.triggerEvent("azalea:despawn"),s.nameTag="despawned"}let t=e.world.structureManager.get(s);t&&e.world.structureManager.delete(t)}}#n(){let o=new Ye("Config"),s=!1;e.system.runInterval((()=>{let e=o.get("StartingRank","");e||(e="Member",o.set("StartingRank",e)),s||("false"!=o.get("converted","false")||(o.set("ChatrankFormat",'{{has_tag staffchat "<bc>[<nc>StaffChat<bc>] " "<bl>"}}§r<bc>[<rc>{{rank_joiner "<drj>"}}§r<bc>] §r<nc><name> §r<bc><dra> §r<mc><msg>'),o.set("converted","true")),s=!0)}),100);for(const e of Object.values(We))j.listen(e.name,e.callback);e.system.runInterval((()=>{j.emit("heartbeat")}),20),j.emit("initialize")}#m(){He.addPermission("Dynamic Sign Editor","signeditor"),He.addPermission("Edit Shop","shop.edit"),He.addPermission("Edit Warps","warps.edit"),He.addPermission("Homes","homes.personal.edit"),He.addPermission("Shared Homes","homes.shared.use"),He.addPermission("Teleport To Warps","warps.tp"),He.addPermission("Bypass Combat Log","combatlog.bypass"),He.addPermission("Edit Chat Options","chatoptions.edit"),He.addPermission("Edit Misc Options","miscoptions.edit"),He.addPermission("Edit Leaderboards","leaderboards.edit"),He.addPermission("Edit Gift Codes","giftcodes.edit"),He.addPermission("Edit PVP Settings","pvpsettings.edit"),He.addPermission("Edit Chest GUIs","chestguis.edit"),He.addPermission("Edit Normal GUIs","formsv2.edit"),He.addPermission("Edit Sidebar Options","sidebar.edit"),He.addPermission("View Reports","reports.view"),He.addPermission("Handle Reports","reports.handle"),He.addPermission("Edit Player Settings","players.edit"),He.addPermission("Edit Important Settings","important.edit"),He.addPermission("Edit Verification Settings","verification.edit"),He.addPermission("Edit Custom Commands","customcmds.edit")}#t(){Ae()}#a(){for(const e of Object.values(Be))Ze.addUI(`${e.name}${e.description?`:${e.description}`:""}`,e.onOpen)}#i(){let e=[h,v,E,C,k,A,H,L,K,Z,se,le,Ue];for(const o of e)for(const e of Object.values(o))e(g)}#r(){e.world.beforeEvents.chatSend.subscribe(p),j.listen("RegisterModule",this.#f)}#f({name:e,mainClass:o}){this.#o.push({name:e,mainClass:o})}#s(){for(const e of Object.values(o))this.loadExtension(e)}loadExtension(e){let o=new e.main(new ro(e.namespace));this.extensions.push({namespace:e.namespace,ext:o})}#d(){e.system.afterEvents.scriptEventReceive.subscribe((o=>{o.sourceType==e.ScriptEventSource.Entity&&j.emit("ScriptEventEntity",o)}))}};