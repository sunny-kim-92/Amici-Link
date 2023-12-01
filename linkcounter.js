let j = require('./pdfLinksArr.js').links

let count = 0
j.forEach((val) => {
    for (let i = 1; i < val.length; val++) {
        val[i].forEach((yes) => {
            count++
        })
    }
})