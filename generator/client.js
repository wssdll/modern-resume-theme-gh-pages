const fs = require('fs')
const cheerio = require('cheerio');
const CryptoJS = require('crypto-js');

function readFile(path){//异步执行
    fs.readFile(path,function(err,data){
        if(err){
            console.log(err);
        }else{
            const $ = cheerio.load(data);

            $('body script').remove()
            let file = $('body').html()

            let ciphertext = CryptoJS.AES.encrypt(file, '')
            fs.writeFile('template/resume', ciphertext, err => {
                if (err) throw err
                console.log('文件已被写入')
            })
        }
    });
}

readFile('./_site/index.html')



