var gulp = require("gulp");
var babel = require("gulp-babel");
var replace = require('gulp-replace');
const fs = require('fs');
const AdmZip = require('adm-zip');
const YAML = require('yaml');
const GulpMinifier = require("./GulpMinifier");
const MediaFire = require('mediafire');
const webhooks = require('discord-webhook-node');
const axios = require('axios').default;
const supabase = require('@supabase/supabase-js');
gulp.task("dev", function (cb) {
  gulp.watch("src/**/*.js", (cb) => {
    return gulp.src("src/**/*.js")
      .pipe(babel({
        plugins: ["wildcard", ["@babel/plugin-transform-react-jsx", {
          "throwIfNamespace": false,
          "runtime": "automatic",
          "importSource": "azalea-jsx"
        }]]
      }))
      .pipe(replace(/\%\%AZALEA_VER\%\%/g, YAML.parse(fs.readFileSync('azalea-build-config.yaml').toString()).version))
      .pipe(replace(/\/\*BUILDTIME\*\//g, Date.now().toString()))
      .pipe(GulpMinifier())
      .pipe(gulp.dest("scripts"))
      .on("end", () => {
        try {
          axios.get('http://localhost:3056/').then(res=>{}).catch(e=>{})
        } catch { }
      })
  })
});

function parseBuild(num) {
  return [
    Math.floor(Math.floor(num / 256) / 256),
    Math.floor(num / 256) % 256,
    num % 256
  ]
}

async function build(prefix = "DEV") {
  let buildConfig = YAML.parse(fs.readFileSync('azalea-build-config.yaml').toString());
  buildConfig.stats.ver++;
  fs.writeFileSync('azalea-build-config.yaml', YAML.stringify(buildConfig));

  let behaviorManifest = YAML.parse(fs.readFileSync('manifest.dev.yaml').toString());

  let version = parseBuild(buildConfig.stats.ver);

  behaviorManifest.header.version = version;
  behaviorManifest.header.name = behaviorManifest.header.name.replace("<V>", buildConfig.version);
  behaviorManifest.modules[0].version = version;
  behaviorManifest.modules[1].version = version;
  fs.writeFileSync('manifest.json', JSON.stringify(behaviorManifest));

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

  let resourceManifest = YAML.parse(fs.readFileSync('resource-manifest.dev.yaml').toString());
  version[0] = 2;

  resourceManifest.header.version = version;
  resourceManifest.header.name = resourceManifest.header.name.replace("<V>", buildConfig.version);
  resourceManifest.modules[0].version = version;

  fs.writeFileSync(`${buildConfig.resourcePath}/manifest.json`, JSON.stringify(resourceManifest));

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
  fs.writeFile(filePath, mcAddon.toBuffer(), err => { })
  let cli = supabase.createClient("https://gjqsznhwkjsanuvlryxe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcXN6bmh3a2pzYW51dmxyeXhlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjUyNTA2NSwiZXhwIjoyMDI4MTAxMDY1fQ.DrPZFIGaCsm5nnMUJtWqtxDp-GrSkTzYPryWhlmXIkE");
  let bucket = cli.storage.from('Downloads');
  let uuid = crypto.randomUUID();
  let uploadData = await bucket.upload(`Downloads/${uuid}.mcaddon`, mcAddon.toBuffer())
  let db = cli.from('DownloadMetadata');
  await db.insert({
    json_data: JSON.stringify({
      date: Date.now(),
      createdBy: "Azalea Build Tool",
      identifier: crypto.randomUUID(),
      buildVersion: buildConfig.stats.ver,
      version: buildConfig.version,
      tag: prefix
    }),
    id: uuid
  })
  let webhook = new webhooks.Webhook(buildConfig.webhook);
  let message = new webhooks.MessageBuilder()
    .setColor(0x43cc68)
    .setTitle(`Build ${buildConfig.stats.ver}`)
    .setDescription(`Made on <t:${Math.floor(Date.now()/1000)}:F>`);
  await webhook.send(message);
  await webhook.sendFile(filePath);
  process.exit();
}

gulp.task("build-dev", async function (cb) {
  build("DEV");
});
gulp.task("build", async function (cb) {
  build("RELEASE");
});
gulp.task("build-beta", async function (cb) {
  build("BETA");
});