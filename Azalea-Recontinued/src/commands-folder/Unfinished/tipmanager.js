export default function addTips() {
    
}
// import { CommandBuilder } from "../commandBuilder";
// import { Database } from "../db";

// function MS(value, { compactDuration, fullDuration, avoidDuration } = {}) {
//     try {
//         if (typeof value === 'string') {
//             if (/^\d+$/.test(value))
//                 return Number(value);
//             const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
//             return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
//         }
//         ;
//         if (typeof value === 'number')
//             return toDuration(value, { compactDuration, fullDuration, avoidDuration });
//         throw new Error('Value is not a string or a number');
//     }
//     catch (err) {
//         const message = isError(err)
//             ? `${err.message}. Value = ${JSON.stringify(value)}`
//             : 'An unknown error has occured.';
//         throw new Error(message);
//     }
//     ;
// }
// ;
// /**
//  * Convert Durations to milliseconds
//  */
// function toMS(value) {
//     const number = Number(value.replace(/[^-.0-9]+/g, ''));
//     value = value.replace(/\s+/g, '');
//     if (/\d+(?=y)/i.test(value))
//         return number * 3.154e+10;
//     else if (/\d+(?=w)/i.test(value))
//         return number * 6.048e+8;
//     else if (/\d+(?=d)/i.test(value))
//         return number * 8.64e+7;
//     else if (/\d+(?=h)/i.test(value))
//         return number * 3.6e+6;
//     else if (/\d+(?=m)/i.test(value))
//         return number * 60000;
//     else if (/\d+(?=s)/i.test(value))
//         return number * 1000;
//     else if (/\d+(?=ms|milliseconds?)/i.test(value))
//         return number;
// }
// ;
// /**
//  * Convert milliseconds to durations
//  */
// function toDuration(value, { compactDuration, fullDuration, avoidDuration } = {}) {
//     const absMs = Math.abs(value);
//     const duration = [
//         { short: 'w', long: 'week', duration: Math.floor(absMs / 6.048e+8) },
//         { short: 'd', long: 'day', duration: Math.floor(absMs / 8.64e+7) % 7 },
//         { short: 'h', long: 'hour', duration: Math.floor(absMs / 3.6e+6) % 24 },
//         { short: 'm', long: 'minute', duration: Math.floor(absMs / 60000) % 60 },
//         { short: 's', long: 'second', duration: Math.floor(absMs / 1000) % 60 },
//         { short: 'ms', long: 'millisecond', duration: absMs % 1000 }
//     ];
//     const mappedDuration = duration
//         .filter(obj => obj.duration !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.duration)
//         .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.duration)}${obj.short}` : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? '' : 's'}`}`);
//     const result = fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
//     return result || `${absMs}`;
// }
// ;
// export default function addTipManager() {
//     new CommandBuilder("tips")
//         .category("Customization")
//         .requiresAdmin(true)
//         .desc("Add randomized tips that send at a specific interval")
//         .callback(({msg,args,response,theme})=>{
//             let tipsDb = new Database("Tips");
//             if(!args.length) {
//                 let tips = tipsDb.get("tips", []);
//                 let text = [`${theme.category}<-=-=- ${theme.command}Tips ${theme.category}-=-=->`]
//                 text.push(...tips);
//                 if(!tips.length) text.push("§cThere are no tips, do §o!tips add <text> §r§cto add one");
//                 text.push(`${theme.description}Do !tips set-interval <time> to change the interval. example: !tips set-interval 10m to send a tip every 10 minutes (default 10 minutes)`);
//             } else if(args[0] == "add") {
//                 let tips = tipsDb.get("tips", []);
//                 tips.push(args.slice(1).join(' '));
//                 tipsDb.set("tips", tips);
//             } else if(args[0] == "set-interval") {
//                 tipsDb.set("interval", )
//             }
//         })
// }