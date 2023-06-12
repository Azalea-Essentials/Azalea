const { src, dest, watch } = require('gulp');
const replace = require('gulp-replace');
const fs = require('fs/promises');
// code is shit currently, i know
exports.default = async function() {

  watch('src/**/*.js', { events: 'all' }, async function(cb) {
    let mainJSContents = (await fs.readFile('./src/main.js')).toString();
    let mainJSLines = mainJSContents.split('\n');
    let toReplace = [];
    for(const line of mainJSLines) {
      if(!line.startsWith(`import '*`)) continue;
      let folder = '';
      let line2 = line;
      if(line.endsWith('\r')) line2 = line2.slice(0,-1)
      if(line2.endsWith(';')) folder = line2.slice(0,-2).substring(`import '*`.length);
      else folder = line2.slice(0,-1).substring(`import '*`.length);
      let cmds = await fs.readdir(`./src/${folder}`);
      let importStatements = `let imports_${folder} = []\n`;
      let anyFnExports = false;
      for(const cmd of cmds) {
        let contents = (await fs.readFile(`./src/${folder}/${cmd}`)).toString();
        let contents2 = contents.split('\n');
        contents2 = contents2.filter(_=>!_.startsWith('import'));
        contents2 = contents2.join('\n')
        if(contents2.startsWith('export function ')) {
          let fnName = contents2.substring(`export function `.length).split('(')[0];
          importStatements += `import { ${fnName} } from './${folder}/${cmd}';\nimports_${folder}.push(${fnName});\n`;
          anyFnExports = true;
        } else {
          importStatements += `import './${folder}/${cmd}'`;
        }
      }
      if(!anyFnExports) importStatements = importStatements.split('\n').slice(1).join('\n');
      toReplace.push({line:line2,content:importStatements});
    }
  
    // body omitted
    let returnResult = src('src/**/*.js')
    .pipe(dest('scripts/'))
    .pipe(src('src/main.js'))
    // .pipe(dest('scripts/'))
  for(const replacementObj of toReplace) {
    returnResult = returnResult.pipe(replace(replacementObj.line, replacementObj.content))
  }
  returnResult = returnResult.pipe(dest('scripts/'));
  return returnResult;

  });

}