const fs = require('fs')
const cheerio = require('cheerio');
const CryptoJS = require('crypto-js');

function readFile(path){
    fs.readFile(path,function(err,data){
        if(err){
            console.log(err);
        }else{
            const $ = cheerio.load(data);

            // remove unused script
            $('body script').remove()

            // image path fix, depending on the deployment environment
            let image =  $('.profile-img')[0]
            image.attribs.style = image.attribs.style.replace(/\//,'./')

            let file = $('body').html()

            let ciphertext = CryptoJS.AES.encrypt(file, 'password')
            fs.writeFile('template/resume', ciphertext, err => {
                if (err) throw err
                console.log('文件已被写入')
            })
        }
    });
}

readFile('./_site/index.html')



