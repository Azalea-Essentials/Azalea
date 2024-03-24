var gulp = require("gulp");
var babel = require("gulp-babel");
var replace = require('gulp-replace');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const axios = require('axios').default;
const zip = require('gulp-zip');
const uuid = require('uuid');
gulp.task("dev", function (cb) {
  gulp.watch("src/**/*.js", (cb)=>{
    return gulp.src("src/**/*.js")
    .pipe(babel({
      plugins: ["wildcard",["@babel/plugin-transform-react-jsx",      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to classic
        "importSource": "azalea-jsx" // defaults to react
      }]]
    }))
    .pipe(replace(/\%\%AZALEA_VER\%\%/g, JSON.parse(fs.readFileSync('build.json').toString()).Version))
    .pipe(replace(/\/\*BUILDTIME\*\//g, Date.now().toString()))
    .pipe(gulp.dest("scripts"))
    .on("end",()=>{
      // try {
      //   axios.get('http://localhost:3056/')
      // } catch {}
    })
  })
});

gulp.task("build", async function (cb) {
  fs.readFile('release.manifest.json',async (err, data)=>{
    let str = data.toString();
    let AzaleaVer = JSON.parse(fs.readFileSync('build.json').toString()).Version;
    str = str.replace(/\$AZALEAVER/g, AzaleaVer);
    let data2 = parseInt(fs.readFileSync('releasedata.txt').toString())+1;
    str = str.replace(/\$BUILDID/g, data2.toString());
    fs.writeFileSync('releasedata.txt', data2.toString());
    while(str.includes("$UUID")) {
      if(!str.includes("$UUID")) break;
      str = str.replace("$UUID", uuid.v4());
    }
    fs.writeFileSync('manifest.json', str);
    const JSZip = require('jszip');

    const sourceFolder = __dirname;
    const outputZip = 'release/output.zip';

    const foldersToInclude = ['scripts', 'structures', 'items', 'entities', 'scripts/adminpanel', 'scripts/commands-folder', 'scripts/events', 'scripts/scriptevents', 'scripts/lib', 'scripts/modules', 'scripts', 'blocks', 'scripts/azalea-jsc'];
    const filesToInclude = ['manifest.json'];
    // 100% ai generated
    async function createSpecificZip() {
        try {
            const zip = new JSZip();
            zip.file("pack_icon.png", fs.readFileSync('pack_icon.png'));
            for (const folderName of foldersToInclude) {
                const folderPath = path.join(sourceFolder, folderName);
                const folderStats = await fsp.stat(folderPath);

                if (folderStats.isDirectory()) {
                    const folder = zip.folder(folderName);
                    const folderItems = await fsp.readdir(folderPath);

                    for (const subItem of folderItems) {
                        const subSourcePath = path.join(folderPath, subItem);
                        const subStats = await fsp.stat(subSourcePath);

                        if (subStats.isFile()) {
                            const fileData = await fsp.readFile(subSourcePath);
                            folder.file(subItem, fileData);
                        }
                    }
                }
            }

            for (const fileName of filesToInclude) {
                const filePath = path.join(sourceFolder, fileName);
                const fileStats = await fsp.stat(filePath);

                if (fileStats.isFile()) {
                    const fileData = await fsp.readFile(filePath);
                    zip.file(fileName, fileData);
                }
            }

            const zipData = await zip.generateAsync({ type: 'nodebuffer' });
            await fsp.writeFile(outputZip, zipData);

            console.log('Specific folders and files compressed to zip successfully!');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    await createSpecificZip();
    const zip = new JSZip();
    let newOutput = 'release/output.zip';
    // fs.renameSync('release/output.zip', 'release/output.mcpack');
    let fileData1 = fs.readFileSync('release/output.zip')
    zip.file('output.mcpack', fileData1);
    let fileData2 = fs.readFileSync('release/resources.mcpack')
    zip.file('resources.mcpack', fileData2);

    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    fs.writeFile(`release/releases/BUILD-V${data2.toString()}.mcaddon`, zipData, err=>{})
  })
});

gulp.task("build-dev", async function (cb) {
  fs.readFile('release.manifest.json',async (err, data)=>{
    let str = data.toString();
    let AzaleaVer = JSON.parse(fs.readFileSync('build.json').toString()).Version;
    str = str.replace(/\$AZALEAVER/g, AzaleaVer);
    let data2 = parseInt(fs.readFileSync('releasedata.txt').toString())+1;
    str = str.replace(/\$BUILDID/g, data2.toString());
    fs.writeFileSync('releasedata.txt', data2.toString());
    while(str.includes("$UUID")) {
      if(!str.includes("$UUID")) break;
      str = str.replace("$UUID", uuid.v4());
    }
    fs.writeFileSync('manifest.json', str);
    const JSZip = require('jszip');

    const sourceFolder = __dirname;
    const outputZip = 'release/output.zip';

    const foldersToInclude = ['scripts', 'structures', 'items', 'entities', 'scripts/adminpanel', 'scripts/commands-folder', 'scripts/events', 'scripts/scriptevents', 'scripts/utils', 'scripts/customcmds', 'scripts/things', 'scripts/things/DirectorUI-Modules', 'scripts/commandmanager_extensions', 'blocks', 'scripts/azalea-jsx', 'scripts/commands-folder/2.2 new feature', 'scripts/commands-folder/Advanced', 'scripts/commands-folder/Azalea', 'scripts/commands-folder/Converter', 'scripts/commands-folder/Dev', 'scripts/commands-folder/Economy', 'scripts/commands-folder/Internal', 'scripts/commands-folder/Leaderboards', 'scripts/commands-folder/Misc', 'scripts/commands-folder/Moderation', 'scripts/commands-folder/Preferences', 'scripts/commands-folder/Unfinished', 'scripts/commands-folder/Utilities', 'scripts/commands-folder/Warps', 'scripts/admin', 'scripts/scriptevents', 'scripts/commands-folder/Social', 'scripts/utils', 'scripts/uis', 'scripts/things', 'scripts/scriptevents', 'scripts/main', 'scripts/lib', 'scripts/handlers', 'scripts/admin', 'scripts/azalea-jsx'];
    const filesToInclude = ['manifest.json'];
    // 100% ai generated
    async function createSpecificZip() {
        try {
            const zip = new JSZip();
            zip.file("pack_icon.png", fs.readFileSync('pack_icon_dev.png'));
            for (const folderName of foldersToInclude) {
                const folderPath = path.join(sourceFolder, folderName);
                const folderStats = await fsp.stat(folderPath);

                if (folderStats.isDirectory()) {
                    const folder = zip.folder(folderName);
                    const folderItems = await fsp.readdir(folderPath);

                    for (const subItem of folderItems) {
                        const subSourcePath = path.join(folderPath, subItem);
                        const subStats = await fsp.stat(subSourcePath);

                        if (subStats.isFile()) {
                            const fileData = await fsp.readFile(subSourcePath);
                            folder.file(subItem, fileData);
                        }
                    }
                }
            }

            for (const fileName of filesToInclude) {
                const filePath = path.join(sourceFolder, fileName);
                const fileStats = await fsp.stat(filePath);

                if (fileStats.isFile()) {
                    const fileData = await fsp.readFile(filePath);
                    zip.file(fileName, fileData);
                }
            }

            const zipData = await zip.generateAsync({ type: 'nodebuffer' });
            await fsp.writeFile(outputZip, zipData);

            console.log('Specific folders and files compressed to zip successfully!');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    await createSpecificZip();
    const zip = new JSZip();
    let newOutput = 'release/final-output.zip';
    fs.renameSync('release/output.zip', 'release/output.mcpack');
    let fileData1 = fs.readFileSync('release/output.mcpack')
    zip.file('output.mcpack', fileData1);
    let fileData2 = fs.readFileSync('release/resources.mcpack')
    zip.file('resources.mcpack', fileData2);

    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    fs.writeFile(`release/releases/DEV-V${data2.toString()}.mcaddon`, zipData, err=>{})
  })
});