import { task, src, dest } from "gulp";
import babel from "gulp-babel";
import replace from 'gulp-replace';
import { readFileSync, writeFileSync, writeFile } from 'fs';
import AdmZip from 'adm-zip';
import { parse, stringify } from 'yaml';
import GulpMinifier from "./GulpMinifier";
import { Webhook } from 'discord-webhook-node';
task("dev", function () {

  const fs = require('fs');

  fs.mkdirSync('bds/worlds/world', { 'recursive': true })
  const admzip = require('adm-zip');
  const zip = new admzip('world.zip');
  const behaviorManifest = require('./manifest.json');
  let buildConfig = parse(fs.readFileSync('azalea-build-config.yaml').toString());
  let resourceManifest = require(`${buildConfig.resourcePath}/manifest.json`);
  if (!fs.existsSync('bds/worlds/world/level.dat')) {
    zip.addFile("world_behavior_packs.json", Buffer.from(JSON.stringify([{
      "pack_id": behaviorManifest.header.uuid,
      "version": behaviorManifest.header.version
    }]), "utf-8"))
    zip.addFile("world_resource_packs.json", Buffer.from(JSON.stringify([{
      "pack_id": resourceManifest.header.uuid,
      "version": resourceManifest.header.version
    }]), "utf-8"))
    // zip.addLocalFolder('./scripts', 'behavior_packs/1/scripts');
    // zip.addLocalFolder('./items', 'behavior_packs/1/items');
    // zip.addLocalFolder('./entities', 'behavior_packs/1/entities');
    // zip.addLocalFile('./manifest.json', 'behavior_packs/1');
    // zip.addLocalFolder(`${buildConfig.resourcePath}/font`, `resource_packs/1/font`);
    // zip.addLocalFolder(`${buildConfig.resourcePath}/textures`, `resource_packs/1/textures`);
    // zip.addLocalFolder(`${buildConfig.resourcePath}/entity`, `resource_packs/1/entity`);
    // zip.addLocalFolder(`${buildConfig.resourcePath}/texts`, `resource_packs/1/texts`);
    // zip.addLocalFolder(`${buildConfig.resourcePath}/ui`, `resource_packs/1/ui`);
    // zip.addLocalFile(`${buildConfig.resourcePath}/manifest.json`, `resource_packs/1`);
    zip.extractAllTo('./bds/worlds/world', true);

  } else {
    fs.writeFileSync('bds/worlds/world/world_resource_packs.json', Buffer.from(JSON.stringify([{
      "pack_id": resourceManifest.header.uuid,
      "version": resourceManifest.header.version
    }])))
    fs.writeFileSync('bds/worlds/world/world_behavior_packs.json', Buffer.from(JSON.stringify([{
      "pack_id": behaviorManifest.header.uuid,
      "version": behaviorManifest.header.version
    }])))
  }
  let newPacks = [

    {
      "file_version": 2
    },

    {
      "file_system": "RawPath",
      "path": "resource_packs/vanilla",
      "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
      "version": "0.0.1"
    },

    {
      "file_system": "RawPath",
      "path": "resource_packs/chemistry",
      "uuid": "0fba4063-dba1-4281-9b89-ff9390653530",
      "version": "1.0.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.20",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.20"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.17.40",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.17.40"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "0.0.1"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.16.100",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.16.100"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.16.210",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.16.210"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/chemistry",
      "uuid": "6baf8b62-8948-4c99-bb1e-a0cb35dc4579",
      "version": "1.0.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/experimental_armadillo",
      "uuid": "9edd5248-1258-460d-86d0-f76ef47b63ea",
      "version": "0.0.1"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.16.200",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.16.200"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.14",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.14.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.15",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.15.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.16",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.16.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.16.220",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.16.220"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.17.0",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.17.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.60",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.60"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.17.10",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.17.10"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.18.20",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.18.20"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.70",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.70"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.17.20",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.17.20"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.18.10",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.18.10"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.0",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.40",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.40"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.17.30",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.17.30"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.50",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.50"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.18.0",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.18.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.18.30",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.18.30"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.60",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.60"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/experimental_villager_trade",
      "uuid": "0127bd67-dc5b-45c2-8d5b-1d65876d5679",
      "version": "0.0.1"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.0",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.0"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.40",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.40"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.10",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.10"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.20",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.20"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.30",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.30"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.50",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.50"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.70",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.70"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.19.80",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.19.80"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.10",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.10"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.30",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.30"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/vanilla_1.20.72",
      "uuid": "fe9f8597-5454-481a-8730-8d070a8e2e58",
      "version": "1.20.72"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/chemistry_1.20.50",
      "uuid": "91b9e624-dda6-43f3-a567-8025c53860b5",
      "version": "1.20.50"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/chemistry_1.20.60",
      "uuid": "5017d347-e962-47c0-9ace-d377321afd23",
      "version": "1.20.60"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/experimental_cameras",
      "uuid": "05112080-727b-4ed4-98d4-b099fc75f2be",
      "version": "0.0.1"
    },

    {
      "file_system": "RawPath",
      "path": "behavior_packs/experimental_update_announced_live2023",
      "uuid": "ddfce3eb-4cad-4816-97e2-6926393b83cb",
      "version": "0.0.1"
    }
  ];
  newPacks.push({
    "file_system": "RawPath",
    "path": "development_resource_packs/azalea",
    "uuid": resourceManifest.header.uuid,
    "version": resourceManifest.header.version
  })
  newPacks.push({
    "file_system": "RawPath",
    "path": "development_behavior_packs/azalea",
    "uuid": behaviorManifest.header.uuid,
    "version": behaviorManifest.header.version
  })
  try {
    fs.rmSync(`bds/development_behavior_packs/azalea`, { recursive: true, force: true });

  } catch { }
  try {
    fs.rmSync(`bds/development_resource_packs/azalea`, { recursive: true, force: true });
  } catch { }
  fs.writeFileSync(`bds/valid_known_packs.json`, JSON.stringify(newPacks, null, 2));
  let zip1 = new AdmZip();
  zip1.addLocalFolder('./scripts', 'scripts');
  zip1.addLocalFolder('./items', 'items');
  zip1.addLocalFolder('./entities', 'entities');
  zip1.addLocalFile('./manifest.json', '');
  zip1.extractAllTo('bds/development_behavior_packs/azalea', true);
  let zip2 = new AdmZip();
  zip2.addLocalFolder(`${buildConfig.resourcePath}/font`, `font`);
  zip2.addLocalFolder(`${buildConfig.resourcePath}/textures`, `textures`);
  zip2.addLocalFolder(`${buildConfig.resourcePath}/entity`, `entity`);
  zip2.addLocalFolder(`${buildConfig.resourcePath}/models`, `models`);
  zip2.addLocalFolder(`${buildConfig.resourcePath}/texts`, `texts`);
  zip2.addLocalFolder(`${buildConfig.resourcePath}/ui`, `ui`);
  zip2.addLocalFile(`${buildConfig.resourcePath}/manifest.json`, ``);
  zip2.extractAllTo(`bds/development_resource_packs/azalea`, true)
  fs.writeFileSync(`bds/server.properties`, fs.readFileSync('server.properties'));
  
});

function parseBuild(num) {
  return [
    Math.floor(Math.floor(num / 256) / 256),
    Math.floor(num / 256) % 256,
    num % 256
  ]
}
async function build(prefix = "DEV") {
  let buildConfig = parse(readFileSync('azalea-build-config.yaml').toString());
  buildConfig.stats.ver++;
  writeFileSync('azalea-build-config.yaml', stringify(buildConfig));

  let behaviorManifest = parse(readFileSync('manifest.dev.yaml').toString());

  let version = parseBuild(buildConfig.stats.ver);

  behaviorManifest.header.version = version;
  behaviorManifest.header.name = behaviorManifest.header.name.replace("<V>", buildConfig.version);
  behaviorManifest.modules[0].version = version;
  behaviorManifest.modules[1].version = version;
  writeFileSync('manifest.json', JSON.stringify(behaviorManifest));

  // Make behavior pack

  let behaviorsZip = new AdmZip();

  for (const folder of buildConfig.folders) {
    behaviorsZip.addLocalFolder(`${__dirname}/${folder}`, `${folder}`);
  }
  for (const file of buildConfig.files) {
    behaviorsZip.addLocalFile(`${__dirname}/${file}`, ``);
  }

  behaviorsZip.addFile(`manifest.json`, Buffer.from(JSON.stringify(behaviorManifest)));

  let resourcesZip = new AdmZip();

  let resourceManifest = parse(readFileSync('resource-manifest.dev.yaml').toString());
  version[0] = 2;

  resourceManifest.header.version = version;
  resourceManifest.header.name = resourceManifest.header.name.replace("<V>", buildConfig.version);
  resourceManifest.modules[0].version = version;

  writeFileSync(`${buildConfig.resourcePath}/manifest.json`, JSON.stringify(resourceManifest));

  for (const folder of buildConfig.resourceFolders) {
    resourcesZip.addLocalFolder(`${buildConfig.resourcePath}/${folder}`, `${folder}`);
  }
  for (const file of buildConfig.resourceFiles) {
    resourcesZip.addLocalFile(`${buildConfig.resourcePath}/${file}`, ``);
  }
  resourcesZip.addFile(`manifest.json`, Buffer.from(JSON.stringify(resourceManifest)));

  let mcAddon = new AdmZip();

  mcAddon.addFile("resources.mcpack", resourcesZip.toBuffer());
  mcAddon.addFile("behavior.mcpack", behaviorsZip.toBuffer());

  mcAddon.addZipComment(JSON.stringify({
    date: Date.now(),
    createdBy: "Azalea Build Tool",
    identifier: crypto.randomUUID(),
    buildVersion: buildConfig.stats.ver,
    version: buildConfig.version,
    tag: prefix
  }));
  let filePath = `release/RELEASES/${prefix}-${buildConfig.stats.ver}.mcaddon`;
  let filePath2 = `release/RELEASES-WITH-src/${prefix}-${buildConfig.stats.ver}.mcaddon`;
  writeFile(filePath, mcAddon.toBuffer(), () => { })
  let mcAddon2 = new AdmZip();
("resources.mcpack", resourcesZip.toBuffer());
  behaviorsZip.addLocalFolder(`${__dirname}/src`, `src`)
  mcAddon2.addFile("behavior.mcpack", behaviorsZip.toBuffer());
  writeFile(filePath2, mcAddon2.toBuffer(), () => { })
  // let cli = supabase.createClient("https://gjqsznhwkjsanuvlryxe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcXN6bmh3a2pzYW51dmxyeXhlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjUyNTA2NSwiZXhwIjoyMDI4MTAxMDY1fQ.DrPZFIGaCsm5nnMUJtWqtxDp-GrSkTzYPryWhlmXIkE");
  // let bucket = cli.storage.from('Downloads');
  // let uuid = crypto.randomUUID();
  // let uploadData = await bucket.upload(`Downloads/${uuid}.mcaddon`, mcAddon.toBuffer())
  // let db = cli.from('DownloadMetadata');
  // // cli.storage.from("Downloads").download(`Downloads/Data`).da
  // await db.insert({
  //   json_data: JSON.stringify({
  //     date: Date.now(),
  //     createdBy: "Azalea Build Tool",
  //     identifier: crypto.randomUUID(),
  //     buildVersion: buildConfig.stats.ver,
  //     version: buildConfig.version,
  //     tag: prefix
  //   }),
  //   id: uuid
  // })
  let webhook = new Webhook(buildConfig.webhook);
  let message =(0x43cc68)
    .setTitle(`Build ${buildConfig.stats.ver}`)
    .setDescription(`Made on <t:${Math.floor(Date.now() / 1000)}:F>`);
  await webhook.send(message);
  await webhook.sendFile(filePath);
  await webhook.sendFile(filePath2);
  process.exit();
}

task("build-dev", async function () {
  build("DEV");
});
task("build", async function () {
  build("RELEASE");
});
task("build-beta", async function () {
  build("BETA");
});
task('test', async function() {
  return src("src/**/*.js")
        .pipe(babel({
          plugins: ["wildcard", ["@babel/plugin-transform-react-jsx", {
            "throwIfNamespace": false,
            "runtime": "automatic",
            "importSource": "azalea-jsx"
          }]]
        }))
        .pipe(replace(/\%\%AZALEA_VER\%\%/g, parse(readFileSync('azalea-build-config.yaml').toString()).version))
        .pipe(replace(/\/\*BUILDTIME\*\//g, Date.now().toString()))
        .pipe(replace(/import '@build'/g, `let build = ${JSON.stringify(parse(readFileSync('azalea-build-config.yaml').toString()))}`))
        .pipe(GulpMinifier())
        .pipe(dest("scripts"))
})