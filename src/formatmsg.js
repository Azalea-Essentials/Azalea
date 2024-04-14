import { world } from '@minecraft/server';
import { AzaleaFormatter } from './utils/FormattingLang';
import { formatStr } from './utils/AzaleaFormatting';
// potential new feature?
// const interpolate = (c1, c2, p) => "#" + [0, 2, 4].map(i => Math.round(parseInt(c1.substring(i, i + 2), 16) + (parseInt(c2.substring(i, i + 2), 16) - parseInt(c1.substring(i, i + 2), 16)) * p)).map(c => (c < 16 ? "0" : "") + c.toString(16)).join("");
// maybe rank gradients? it might not look great because of the lack of colors in bedrock, but i'll think about it
// also might rewrite this entire thing later, its a bit messy
// and if you are reading this, you can look through the code, i'll probably have a lot more shit like this
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
    return list
        .filter(_=>_.startsWith(prefix))
        .map(_=>_.substring(prefix.length));
}
function getFirstStringStartingWithPrefixAndRemovePrefix(list, prefix, defaultString=null) {
    let result = getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix);

    if(result.length) return result[0]
    else return defaultString;
}

//
//export function formatMSG(msgFormat = "${bracketColor}[${rankColor}$ranks(§r${bracketColor}, ${rankColor})§r${bracketColor}] §r${nameColor}${senderName} > §r${messageColor}${message}", ranks2, bracketColor, nameColor, rankColor, messageColor, messageContent, senderName, scoreboardIdentity, player, pre) {
//
//    let color = ranks2[0].startsWith('§') ? `§${ranks2[0][1]}` : rankColor
//    let msg = msgFormat
//        .replace(/\#DRA/g, "»")
//        .replace(/\#NC/g, nameColor)
//        .replace(/\#MC/g, messageContent.startsWith('>') ? '§a' : messageColor)
//        .replace(/\#RC/g, rankColor)
//        .replace(/\#BC/g, bracketColor)
//        .replace(/\#PR/g, pre)
//        .replace(/\#P/g, senderName)
//        .replace(/\#FRC/g, color)
//        .replace(/\#M/g, messageContent)
//    
//    let rankformat = msg.match(/\#R\(([\s\S]*?)\)/g);
//    if(rankformat && rankformat.length) {
//        for(const rankformatter of rankformat) {
//            // console.warn(rankformatter)
//            let rankseparator = rankformatter.substring('#R('.length).slice(0,-1);
//            msg = msg.replace(rankformatter, ranks2.join(rankseparator));
//        }
//    
//    }
//    let scoreformat = msg.match(/\#S\(([\s\S]*?)\)/g);
//    if(scoreformat && scoreformat.length) {
//        for(const scoreformatter of scoreformat) {
//            let score = 0;
//            try {
//                let content = scoreformatter.substring('#S('.length).slice(0,-1).split(',').map(_=>_.trim());
//                let objective = world.scoreboard.getObjective(content[0]);
//                score = objective.getScore(scoreboardIdentity);
//            } catch {score = 0}
//            msg = msg.replace(scoreformatter, `${score}`);
//        }
//    
//    }
//
//    let htformat = msg.match(/\#HT\(([\s\S]*?)\)/g);
//    if(htformat && htformat.length) {
//        for(const htformatter of htformat) {
//            let content = htformatter.substring('#HT('.length).slice(0,-1).split(',');
//            msg = msg.replace(htformatter, player.hasTag(content[0]) ? content[1] : content[2]);
//        }
//    
//    }
//
//    let rainbowformat = msg.match(/\#RAINBOW\(([\s\S]*?)\)/g);
//    if(rainbowformat && rainbowformat.length) {
//        for(const rainbowformatter of rainbowformat) {
//            let content = rainbowformatter.substring('#RAINBOW('.length).slice(0,-1);
//            let newText = "";
//            let chars = "cgeab5d".split('').map(_=>`§${_}`);
//            for(let i = 0;i < content.length;i++) {
//                newText += `${chars[i % chars.length]}${content[i]}`
//            }
//            msg = msg.replace(rainbowformatter, newText);
//        }
//    
//    }
////!chatrankformat change #BC[ #RC#R(#RC §r#BC] [ §r#RC) §r#BC] #NC#P §r#BC#DRA §r#MC#M
//    let firstTagStartingWithPrefixFormat = msg.match(/\#FTSWP\(([\s\S]*?])\)/g);
//    if(firstTagStartingWithPrefixFormat && firstTagStartingWithPrefixFormat.length) {
//        for(const formatter of firstTagStartingWithPrefixFormat) {
//            let content = formatter.substring('#FTSWP('.length).slice(0,-1).split(',');
//            msg = msg.replace(formatter, getFirstStringStartingWithPrefixAndRemovePrefix(player.getTags(), content[0]) ? content[1].replace(/\#TAG/g, getFirstStringStartingWithPrefixAndRemovePrefix(player.getTags(), content[0])) : content[2]);
//        }
//    }
//
//    let testFormatters = msg.match(/\#F1\(([\s\S]*?)\)/g);
//    if(testFormatters && testFormatters.length) {
//        for(const formatter of testFormatters) {
//            let args = formatter.match(/\"([\s\S]*?)\"/g);
//            if(!args) continue;
//            args = args.map(_=>_.slice(0,-1).substring(1).replaceAll('^q','"').replaceAll('^p',')'))
//            msg = msg.replace(
//                formatter,
//                getFirstStringStartingWithPrefixAndRemovePrefix(
//                    player.getTags(),
//                    args[0]
//                ) ? args[1].replaceAll('#TAG',
//                    getFirstStringStartingWithPrefixAndRemovePrefix(
//                        player.getTags(),
//                        args[0]
//                    )
//                ) : args[2]
//            )
//        }
//    }
//    return msg.trim();
//}

let formatter = new AzaleaFormatter();
formatter.reset();
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
export function formatMSG(
    msgFormat = "${bracketColor}[${rankColor}$ranks(§r${bracketColor}, ${rankColor})§r${bracketColor}] §r${nameColor}${senderName} > §r${messageColor}${message}",
    ranks2,
    bracketColor,
    nameColor,
    rankColor,
    messageColor,
    messageContent,
    senderName,
    scoreboardIdentity,
    player,
    pre) {
    let stringToReturn = formatStr(msgFormat, player, {
        bc: bracketColor,
        nc: nameColor,
        rc: rankColor,
        mc: messageColor,
        msg: messageContent
    });
    return stringToReturn.replace(/\s+/g," ");
}