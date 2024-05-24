import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ActionForm } from '../form_func';
import moment from '../moment';
import { uiManager } from '../uis';

export const REVIEWS = function() {
    uiManager.addUI("Azalea0.9/ReviewViewer", (player)=>{
        let actionForm = new ActionForm();
            let text = [];
            let reviews = new Database("Reviews");
            let reviewList = reviews.get("Reviews", []);
            let sum = 0;
            for(const review of reviewList) {
                sum += review.rating;
            }
            let avg = sum / reviewList.length;
            text.push(`§aAverage: §r${isNaN(avg) ? "No Reviews" : `${avg}`}`)
            text.push(``);
            for(const review of reviewList) {
                text.push(`§dFrom §e${review.sentBy} §7§o(${moment(review.sentAt).fromNow()})`);
                text.push(`§a${review.rating}/10`)
                text.push(`§f${review.moreInfo}`)
                text.push(``)
            }
            actionForm.button("Ok", null, ()=>{})
            actionForm.body(text.join('\n§r'));
            actionForm.show(player, false, ()=>{})
    })
    return new ConfiguratorSub("§6Reviews", "textures/azalea_icons/10")
        .setCallback(()=>{
            
        })
}