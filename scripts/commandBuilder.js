import{commands as t}from"./commands";export class CommandBuilder{constructor(t){this.name=t,this.data={description:"No description",admin:!1,cb_version:2,category:"Uncategorized",onRun:(t,a,e,i)=>{i("ERROR Looks like someone forgot to setup a callback!")}}}callback(t){return"function"!=typeof t||(this.data.onRun=t),this}desc(t){return"string"!=typeof t||(this.data.description=t),this}deprecated(t=!0){return this.data.deprecated=t,this}aliases(t){return this.data.aliases=t,this}category(t){return"string"!=typeof t||(this.data.category=t),this}requiresAdmin(t){return"boolean"!=typeof t||(this.data.admin=t),this}register(){t.addCommand(this.name,this.data)}}