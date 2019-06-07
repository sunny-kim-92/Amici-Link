var download = require("download-pdf");

const links = require("./pdfLinksArr").links;

let side = "";

var options = {
  directory: "./pdfs/",
};

links.forEach((arr) => {
  for (let j = 1; j < arr.length; j++) {
    arr[j].forEach((url, k) => {
      if (j === 2) {
        side = " Cert ";
      }
      if (j === 3) {
        side = " Petitioner ";
      }
      if (j === 4) {
        side = " Respondent ";
      }
      if (j === 5) {
        side = " US";
      }
      options.filename = "Case ID " + links[j][0] + side + k + ".pdf";
      console.log(url, options)
      download(url, options, function(err) {
        if (err) throw err;
      });
    });
  }
});
