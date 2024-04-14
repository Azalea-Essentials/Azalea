import e from"./moment";import{system as o}from"@minecraft/server";import{PLAYER_REPORTS as a}from"./adminpanel/reports";import{REVIEWS as t}from"./adminpanel/reviews";import{TAGCMD_UI as r}from"./adminpanel/tagcmd_ui";import{ADMIN_TEST as i}from"./adminpanel/test";import{Database as n}from"./db";import{ActionForm as s}from"./form_func";import{POLLS as d}from"./adminpanel/polls";import{LB as m}from"./adminpanel/leaderboardthemes";import{QUESTS as p}from"./adminpanel/quests";import{commands as l}from"./commands";import{CUSTOM_COMMANDS as u}from"./adminpanel/customcommands";import c from"./adminpanel/warpEditor";import g from"./things/FormsV2";import f from"./customthemes";import b from"./adminpanel/logs";import S from"./adminpanel/chestguis";import h from"./adminpanel/formsv3";import y from"./adminpanel/sidebar";import T from"./adminpanel/guimaker";import v from"./adminpanel/suggestionBox";import x from"./adminpanel/modalforms";import C from"./adminpanel/giftcodes";export class ConfiguratorBase{constructor(){this.options={}}addSub(e){return this.options[e.name]={options:e.options,icon:e.icon,type:e.type},this}toOptions(){return this.options}}export class ConfiguratorSub{constructor(e,o=null){this.name=e,this.icon=o,this.options=[],this.type="normal"}setCallback(e){return this.type="func",this.options=[{fn:e}],this}addTextInput(e,o,a){return this.options.push({type:"text-input",key:e,label:o,placeholder:a}),console.log(this.options),this}addDropdown(e,o,a,t){return this.options.push({type:"dropdown",keyOptions:a,cliOptions:o,label:t,key:e}),this}addSlider(e,o,a,t,r,i=1){return this.options.push({type:"slider",maxVal:a,minVal:o,label:r,key:e,step:t,default:i}),this}addToggle(e,o){return this.options.push({type:"toggle",label:o,key:e}),this}}i();export function handleConfigurator(e){if(e instanceof ConfiguratorBase){let o=e.toOptions(),a=new s;for(const e of Object.keys(o))a.button(e,null,(a=>{let t=o[e];if("func"==t.type)return t.options[0].fn(a);if("hardcoded-playermenu"!=t.type)for(const e of t.options);}))}}let w=(new ConfiguratorBase).addSub(v()).addSub(new ConfiguratorSub("§dAzalea Settings","textures/azalea_icons/Azalea").addTextInput("ServerName","Server Name","Type a server name...").addTextInput("ServerDescription","Server Description","Type a server description...").addTextInput("ReportReasons","Report Reasons","New").addTextInput("MoneyScoreboard","Money Scoreboard (default: money)","Type the scoreboard here").addTextInput("Prefix","Prefix","Type a prefix").addToggle("DisableServerCommunity","Disable Server Community").addToggle("WelcomeMessageEnabled","Welcome message enabled?").addTextInput("ServerWelcomeMessage","Welcome message text, remember: §d[@username] §r= joined user ","Type a welcome message.").addToggle("TeleportPlayerToSpawnOnRejoin","Teleport players to spawn when joining").addToggle("IgnoreSetupMessage","Disable Setup Message")).addSub(p()).addSub(S()).addSub(b()).addSub(g()).addSub(x()).addSub(d()).addSub(new ConfiguratorSub("§bChat","textures/azalea_icons/Chat").addToggle("EnableAntiSpam","Enable Anti-Spam?").addSlider("MessageLimit",1,10,1,"Message limit (per 3 seconds)",1).addTextInput("SpamLimitReachedMessage","Anti-Spam message","Shows a message user when spam")).addSub(t()).addSub(new ConfiguratorSub("§2Verification","textures/azalea_icons/4").addToggle("EnableVerification","Enable Verification?").addDropdown("VerificationType",["Private (Requires Code + Command)","Public (Requires Command)"],["private","public"],"Verification Type").addTextInput("VerificationCode","Verification Code (Requires private verification type)","Type a verification code...")).addSub(new ConfiguratorSub("§dExperimental Toggles","textures/azalea_icons/3").addToggle("AuctionHouse","§bAuction House").addToggle("FirstTimeJoinUI","§bFirst Time Join UI").addToggle("ImprovedNametagsEnabled","§bImproved nametags").addToggle("QuestsEnabled","Quests §6§o(Unfinished V1.0 Feature)")).addSub(C()).addSub(a()).addSub(c()).addSub(m()).addSub(new ConfiguratorSub("§mPlayer Shops","textures/azalea_icons/PlayerShop/Normal/Online/playershop").addToggle("DisablePlayerShops","Disable player shops").addDropdown("Sorting",["Default","Newest First","Oldest First","Player","Lowest Avg. Price","Highest Avg. Price"],["NF","NF","OF","P","LAP","HAP"],"Default Sorting").addSlider("PlayerShopLimit",1,10,1,"Shop Limit (Per Player)",3)).addSub(new ConfiguratorSub("§6Command Perms","textures/azalea_icons/CommandPerms")).addSub(u()).addSub(y());w.options["§2Players"]={type:"hardcoded-playermenu",icon:"textures/azalea_icons/8"},w.options["§eDeveloper Settings"]={icon:"textures/azalea_icons/Wrench",options:[{label:"Dev Environment",type:"toggle",key:"DevEnvironment"}]},o.runTimeout((()=>{l._cmds.forEach((e=>{e.private||e.isDev||"toggle"==e.name||"help"==e.name||"version"==e.name||"credits"==e.name||w.options["§6Command Perms"].options.push({type:"dropdown-command",command:e.name})}))}),90);export const baseConfigMenu=w;o.run((()=>{}));