function ajaxPost(url, data, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)

    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                callback(xhr.response)
            } else {
                callback()
            }
        }
    }
}

ajaxPost('resume', null, function (res, date) {
    // var ciphertext = CryptoJS.AES.encrypt(res, 'password')
    // console.log(ciphertext.toString());

    var plaintext
    var password = getQueryString('pwd') || ''
    var bytes = CryptoJS.AES.decrypt(res, password);
    try {
        plaintext = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        plaintext = e
    }
    document.body.innerHTML = plaintext
})

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = decodeURI(window.location.search.substr(1)).match(reg)
    if (r !== null) {
        return decodeURI(r[2])
    }
    return null
}
