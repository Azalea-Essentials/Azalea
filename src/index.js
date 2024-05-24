import './initialLoad';
import './main';
import './auctionhouse';
import { uiManager } from './uis';
import { ActionForm } from './form_func';
uiManager.addUI('banana:banana', (player)=>{
    let actionForm = new ActionForm();
    // actionForm.title(`Visit: Notenderman9677`);
    actionForm.title(`Visit: ${player.name}`);
    actionForm.body(`Displaying §b${player.name}'s Banana`);
    actionForm.button(`§aView`, `textures/amethyst_icons/Packs/asteroid_icons/accessibility_glyph_color`, (player)=>{
        let why = new ActionForm();
        why.title(`Nothing`);
        why.body(`Item is too small to display`);
        why.button(`Exit`, `textures/amethyst_icons/Packs/asteroid_icons/ErrorGlyph`, ()=>{

        })
        why.show(player, false, ()=>{})
    })
    actionForm.button(`§cFuckk off`, `textures/amethyst_icons/Packs/asteroid_icons/Feedback`, ()=>{
        
    })
    actionForm.show(player, false, ()=>{
        
    })
})