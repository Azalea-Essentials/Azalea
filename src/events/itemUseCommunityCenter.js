import { Database } from "../db"
import { ActionForm, ModalForm } from "../form_func"
import { uiManager } from "../uis"
import moment from '../moment';
import { world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ModalFormData } from "@minecraft/server-ui";
import { isAdmin } from "../isAdmin";
import { ChestFormData } from "../chestUI";
import emojis from "../emojis";
uiManager.addUI("Azalea0.9.1/CommunityCenter/Vote", (player, pollId, pollKey, isAdmin = false) => {
    let pollDb = new Database("Polls");
    let pollData = pollDb.get(pollKey);
    let pollVotes = new Database(`PollsVote-${pollId}`);
    let individualPolls = pollVotes.vals.reduce((acc, obj) => {
        const key = obj.o;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    let actionForm = new ActionForm();
    let opts = [];
    actionForm.button("Exit", "textures/azalea_icons/2", () => { });
    // if (Date.now() > pollData.duration) return;
    let endsIn = (pollData.duration > Date.now() ? `Ends ` : `Ended `) + moment(pollData.duration).fromNow();
    actionForm.body(endsIn)
    actionForm.title("Vote: "+pollData.name);
    for (const option of pollData.options) {
        opts.push(option);
        let num = individualPolls[option] ? individualPolls[option] : 0;
        actionForm.button(`§c${option} §7( ${num} )`, null, (player, i) => {
            if(Date.now() > pollData.duration) return;
            pollVotes.set(`${player.id}`, {
                n: player.name,
                t: Date.now(),
                o: option
            });

        })
    }
    if(isAdmin) {
        let pollKey2 = pollKey;
        actionForm.button("Delete", null, (player, i)=>{
            pollDb.hardDelete(pollKey);
        })
        actionForm.button("Edit", null, (player, i)=>{
            try {
                let modal = new ModalForm();
                modal.title("Edit Poll")
                modal.textField("Question:", "Example: dogs or cats?", pollData.name, ()=>{});
                modal.textField("Comma separated options list:", "Example: dogs, cats", pollData.options.join(','), ()=>{});
                modal.show(player, false, (player, response)=>{
                    let pollDb = new Database("Polls");
                    pollDb.edit(pollKey2, {
                        name: response.formValues[0],
                        options: response.formValues[1].split(',').map(_=>_.trim())
                    })
                })
    
            } catch(e) {
                // console.warn("ERR");
                // console.warn(e);
            }
        })
    }
    actionForm.show(player, false, () => { })

})
uiManager.addUI("Azalea2.0/ServerCommunity/Post", (player, error = undefined, title = undefined, desc = undefined)=>{
    let postsDb = new DynamicPropertyDatabase("ServerCommunity");
    let posts = postsDb.get("posts", []);
    let modal = new ModalForm();
    if(error) modal.title(`§c${error}`);
    modal.textField("Title (Max: 15 chars)", "Type a post title", title);
    modal.textField("Description (Max: 100 chars)", "Post description", desc);
    modal.show(player, false, (player, response)=>{
        if(!response.formValues[0] || response.formValues[0].length > 15) return uiManager.open("Azalea2.0/ServerCommunity/Post", player, "Title too long or not set", response.formValues[0], response.formValues[1])
        if(!response.formValues[1] || response.formValues[1].length > 100) return uiManager.open("Azalea2.0/ServerCommunity/Post", player, "Description too long or not set", response.formValues[0], response.formValues[1])
        posts.push({
            id: Date.now(),
            title: response.formValues[0],
            description: response.formValues[1],
            sentBy: player.name,
            upvotes: [],
            downvotes: [],
            comments: []
        })
        postsDb.set("posts", posts);
        uiManager.open("Azalea2.0/ServerCommunity/Root", player);
    })
});
uiManager.addUI("Azalea2.0/ServerCommunity/ViewPost", (player,id)=>{
    let postsDb = new DynamicPropertyDatabase("ServerCommunity");
    let posts = postsDb.get("posts", []);
    let post = posts.find(_=>_.id == id)
    if(!post) return uiManager.open("Azalea2.0/ServerCommunity/Root", player);
    let actionForm = new ActionForm();
    actionForm.title(`${post.title}`)
    let text = [
        `§eDescription: §7${post.description}`,
        `§eAuthor: §7${post.sentBy}`,
        ``,
        `§a${post.upvotes.length} upvote(s)§r§7, §c${post.downvotes.length} downvote(s)`,
        `${post.upvotes.length - post.downvotes.length > 0 ? "§6" : "§9"}${post.upvotes.length - post.downvotes.length} Votes`,
        `§dComments:`
    ]
    let comments = post.comments ? post.comments : [];
    for(const comment of comments) {
        text.push(`§7- §r§f<${comment.author}> §7${comment.text}`)
    }
    let reactions = post.reactions ? post.reactions : {};
    let reactionText = [];
    for(const key of Object.keys(reactions)) {
        if(!reactions[key].length) continue;
        reactionText.push(`${emojis[key]} ${reactions[key].length}`);
    }
    if(reactionText.length) {
        text.push(``);
        text.push(reactionText.join('§7 | §r'));
    }
    actionForm.body(text.join('\n§r'));
    actionForm.button("Back", "textures/azalea_icons/2", (player)=>{
        uiManager.open("Azalea2.0/ServerCommunity/Root", player);
    })
    actionForm.button("Upvote", "textures/azalea_icons/Up", (player)=>{
        let postIndex = posts.findIndex(_=>_.id == id)
        posts[postIndex].upvotes = posts[postIndex].upvotes.filter(_=>_ != player.name);
        posts[postIndex].downvotes = posts[postIndex].downvotes.filter(_=>_ != player.name);
        // if(posts[postIndex].downvotes.includes(player.name)) {
        //     posts[postIndex].downvotes.splice(posts[postIndex].downvotes.indexOf(player.name), 1);
        // }
        posts[postIndex].upvotes.push(player.name)
        postsDb.set("posts", posts);
        uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
    })
    actionForm.button("Downvote", "textures/azalea_icons/Down", (player)=>{
        let postIndex = posts.findIndex(_=>_.id == id)
        // if(posts[postIndex].upvotes.includes(player.name)) {
        //     posts[postIndex].upvotes.splice(posts[postIndex].upvotes.indexOf(player.name), 1);
        // }
        posts[postIndex].upvotes = posts[postIndex].upvotes.filter(_=>_ != player.name);
        posts[postIndex].downvotes = posts[postIndex].downvotes.filter(_=>_ != player.name);
        posts[postIndex].downvotes.push(player.name)
        postsDb.set("posts", posts);
        uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
    })
    actionForm.button("Comment", "textures/azalea_icons/Chat", (player)=>{
        let modal = new ModalForm();
        modal.textField("Comment Text", `Comment as @${player.name}`, undefined);
        modal.show(player, false, (player, response)=>{
            if(!response.formValues[0] || response.formValues[0].length > 100) return uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
            let postIndex = posts.findIndex(_=>_.id == id)
            let comments = posts[postIndex].comments ? posts[postIndex].comments : [];
            comments.push({
                author: player.name,
                admin: isAdmin(player),
                text: response.formValues[0]
            });
            posts[postIndex].comments = comments;
            postsDb.set('posts', posts);
            uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
        })
    })
    if(isAdmin(player)) {
        if(postsDb.get("PinnedPost", null) && postsDb.get("PinnedPost", null).post == id) {
            actionForm.button("Unpin", "textures/azalea_icons/RemoveItem", (player)=>{
                postsDb.delete("PinnedPost");
                uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
            })
        } else {
            actionForm.button("Pin", "textures/azalea_icons/3", (player)=>{
                postsDb.set("PinnedPost", {post:id})
                uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
            })
        }
    }
    if(isAdmin(player) || player.name == post.sentBy) {
        actionForm.button("Delete", "textures/azalea_icons/Delete", (player)=>{
            let postIndex = posts.findIndex(_=>_.id == id);
            posts.splice(postIndex, 1);
            postsDb.set('posts', posts);
            uiManager.open("Azalea2.0/ServerCommunity/Root", player);
        })
    }
    actionForm.button("React", "textures/azalea_icons/10-old", (player)=>{
        let actionForm = new ActionForm();
        actionForm.title("Add Reaction");
        actionForm.button("Back", "textures/azalea_icons/2", (player)=>{
            uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
        })
        for(const emoji of Object.keys(emojis)) {
            actionForm.button(`${emojis[emoji]} [ :${emoji}: ]`, null, (player)=>{
                let postIndex = posts.findIndex(_=>_.id == id);
                let reactions = posts[postIndex].reactions ? posts[postIndex].reactions : {};
                if(reactions[emoji]) {
                    if(reactions[emoji].includes(player.name)) {
                        reactions[emoji].splice(reactions[emoji].indexOf(player.name), 1);
                    } else {
                        reactions[emoji].push(player.name);
                    }
                } else {
                    reactions[emoji] = [player.name];
                }
                posts[postIndex].reactions = reactions;
                postsDb.set('posts', posts);
                uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, id);
            })
        }
        actionForm.show(player, false, (player, response)=>{

        })
    })
    actionForm.show(player, false, (player, response)=>{

    })
})
uiManager.addUI("Azalea2.0/ServerCommunity/Root", (player)=>{
    let actionForm = new ActionForm();
    actionForm.title("Community");
    actionForm.button(`Back`, `textures/azalea_icons/2`, (player)=>{
        uiManager.open('Azalea0.9.1/CommunityCenter/Root', player);
    })
    actionForm.button(`Post`, `textures/azalea_icons/1`, (player)=>{
        uiManager.open('Azalea2.0/ServerCommunity/Post', player);
    })
    let postsDb = new DynamicPropertyDatabase("ServerCommunity");
    let posts = postsDb.get("posts", []);
    posts = posts.sort((a,b)=>b.id - a.id)
    let pinnedPost = postsDb.get("PinnedPost", null);
    if(pinnedPost) {
        let pinnedPostData = posts.find(_=>_.id == pinnedPost.post);
        if(pinnedPostData) {
            actionForm.button(`§b!! ${pinnedPostData.title} §r§b!!\n§r§7${pinnedPostData.sentBy}`, null, (player)=>{
                uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, pinnedPostData.id);
            })    
        }

    }
    for(const post of posts) {
        actionForm.button(`${post.title}\n§r§7${post.sentBy}`, null, (player)=>{
            uiManager.open("Azalea2.0/ServerCommunity/ViewPost", player, post.id);
        })
    }
    actionForm.show(player, false, (player)=>{

    })
})
uiManager.addUI("Azalea0.9.1/CommunityCenter/Root", (player) => {
    try {
        // let chest = new ChestFormData("single");
        // chest.title(`Server Hub`);
        // chest.button(10, "Announcements", [`View the announcements of this server`], `textures/azalea_icons/ReportedPlayer`);
        // chest.button(13, "Community", [`Server Community`], `textures/azalea_icons/icontextures/gem_01f`);
        // chest.button(16, "Polls", [`Vote for polls made by admins!`], `textures/azalea_icons/vote2`);
        // let text = [`§dRecent Announcement:`]
        let AnncList = new Database("AnncList");
        let list = JSON.parse(AnncList.get("AnncList", "[]"));
        // if(list.length) {
        //     let announcement = list[0];
        //     text.push(`§r§e<${announcement.s}> §7${announcement.t}`);
        // } else {
        //     text.push(`§cNo announcements... §e!announcements announce <text>`);
        // }
        // text.push(`A`)
        // text.push(`A`)
        // text.push(`A`)
        // text.push(`A`)
        // text.push(`A`)
        // text.push(`A`)
        // chest.titleText = `§0${chest.titleText.substring(2)}`
        // chest.show(player, text.join('\n§r')).then(res=>{
        //     if(res.canceled) return;
        // })

        let pollsDb = new Database("Polls");
        let actionForm = new ActionForm();
        actionForm.title("Server Hub");
        // actionForm.button(`Exit`, "textures/azalea_icons/2", ()=>{})
        actionForm.button(`§g§l§o§w§r§dCommunity`, `textures/azalea_icons/icontextures/gem_01f`, (player)=>{
            uiManager.open("Azalea2.0/ServerCommunity/Root", player)
        })
        for (const key of pollsDb.keys()) {
            if(!key.startsWith('poll')) continue;
            try {
                let poll = pollsDb.get(key);
                let votesDb = new Database(`PollsVote-${poll.pollId}`);
                if (Date.now() > poll.duration) continue;
                let endsIn = (poll.duration > Date.now() ? `Ends ` : `Ended `) + moment(poll.duration).fromNow();
                actionForm.button(`§cPoll\n§r§f${poll.name}`, "textures/azalea_icons/vote", (player, i) => {
                    uiManager.open("Azalea0.9.1/CommunityCenter/Vote", player, `${poll.pollId}`, key);
                });
    
            } catch(e) {
                console.warn(e);
            }
        }
        let body = ["§eAnnouncements:"];
        if(!list.length) body.push("§c§ono announcements...  Make one with §e!announcements announce <text>");
        for(const item of list) {
            body.push(`§a${item.s} §8>> §e${item.t}`);
        }
        actionForm.body(body.join('\n§r'))
        actionForm.show(player, false, () => { })
    
    } catch(e) {
        console.warn("ERR");
    }

})

export default {
    name: "initialize",
    callback(e) {
        world.afterEvents.itemUse.subscribe(e => {
            
            if (e.itemStack.typeId === "azalea:server_hub") {
                // console.warn("Opening")
                try {
                    uiManager.open("Azalea0.9.1/CommunityCenter/Root", e.source);

                } catch(e) {
                    // console.warn("ERR");
                    // console.warn(e);
                }
            }
        });

    }
}