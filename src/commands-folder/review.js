import { Database } from '../db';
import { ModalForm } from '../form_func';
import { uiManager } from '../uis';

export default function addCreditsCommand(commands) {
    uiManager.addUI("AzaleaExtra/Review",(player)=>{
        let reviewModal = new ModalForm();
        reviewModal.slider("Rating ( 1 - 10 )", 1, 10, 1, 1, ()=>{});
        reviewModal.textField("Extra Info", "Type extra info here", null, ()=>{});
        reviewModal.show(player, true, (player, response)=>{
            let data = {
                sentBy: player.name,
                rating: response.formValues[0],
                moreInfo: response.formValues[1],
                sentAt: Date.now()
            };
            let reviews = new Database("Reviews");
            let reviewList = reviews.get("Reviews", []);
            reviewList.push(data);
            reviews.set("Reviews", reviewList);
        })
    })
    commands.addCommand("review", {
        description: "Review",
        category: "Feedback",
        onRun(msg, args, theme, response, commands, prefix) {
            let reviewModal = new ModalForm();
            reviewModal.slider("Rating ( 1 - 10 )", 1, 10, 1, 1, ()=>{});
            reviewModal.textField("Extra Info", "Type extra info here", null, ()=>{});
            reviewModal.show(msg.sender, true, (player, response)=>{
                let data = {
                    sentBy: msg.sender.name,
                    rating: response.formValues[0],
                    moreInfo: response.formValues[1],
                    sentAt: Date.now()
                };
                let reviews = new Database("Reviews");
                let reviewList = reviews.get("Reviews", []);
                reviewList.push(data);
                reviews.set("Reviews", reviewList);
            })
        }
    })
}