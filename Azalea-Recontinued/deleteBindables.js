const fs = require('fs');
fs.readdir('items', (err,files)=>{
    for(const file of files) {
        if(!file.startsWith('bindable')) continue;
        fs.unlink(`items/${file}`, (err)=>{})
    }
})