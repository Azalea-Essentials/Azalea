import"./initialLoad";import"./main";import"./auctionhouse";import{uiManager as t}from"./uis";import{ActionForm as o}from"./form_func";t.addUI("banana:banana",(t=>{let i=new o;i.title(`Visit: ${t.name}`),i.body(`Displaying §b${t.name}'s Banana`),i.button("§aView","textures/amethyst_icons/Packs/asteroid_icons/accessibility_glyph_color",(t=>{let i=new o;i.title("Nothing"),i.body("Item is too small to display"),i.button("Exit","textures/amethyst_icons/Packs/asteroid_icons/ErrorGlyph",(()=>{})),i.show(t,!1,(()=>{}))})),i.button("§cFuckk off","textures/amethyst_icons/Packs/asteroid_icons/Feedback",(()=>{})),i.show(t,!1,(()=>{}))}));