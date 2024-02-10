import {
  system,
  world,
} from '@minecraft/server';

export default function addTadpoleCommand(commands) {
      commands.addCommand("tadpole",{
          description: "Spawns a tadpole",
          category: "Why",
          admin: true,
          async onRun(msg, args, theme, response) {
              
            //   if(score == 0 && !isAdmin(msg.sender)) return response(`ERROR This command requires admin`);
              response(`INFO Summoning tadpole`)
  
              let x = msg.sender.location.x;
              let y = msg.sender.location.y;
              let z = msg.sender.location.z;
              system.run(()=>{
                  let overworld = world.getDimension("overworld");
                  let tadpole = overworld.spawnEntity("minecraft:tadpole", {
                      x,
                      y,
                      z
                  })
                  let colors = '0123456789abcdefg'.split('').map(_=>`§${_}`);
                  tadpole.nameTag = `${colors[Math.floor(Math.random() * colors.length)]}THE TADPOLE`
              })
          }
      })
  }