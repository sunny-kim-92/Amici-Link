const cheerio = require("cheerio");
const rp = require("request-promise");

rp(
    "https://www.scotusblog.com/case-files/terms/ot2018/"
)
  .then(res => {
    let links = cheerio.load(res);
    return links;
  })
  .then($ => {
    let titlesArr = []
    let linksArr = [];
    $(`td`)
      .find(`a`)
      .attr(`href`, (i, val) => {
        linksArr.push(val);
      });
    $(`a.case-title`).text((i, val) => {
      titlesArr.push([i, val])
    })
    return linksArr;
  })
  .then(arr => {
    let final = arr.filter(url => {
      if (typeof url === "string") {
        return (
          url.substring(0, 43) ===
          "https://www.scotusblog.com/case-files/cases"
        );
      } else return false;
    });
    console.log(final)
    return final;
  })
  .then(caseLinks => {
    let tempObj = {};
    let tempPetitioner = [];
    let tempRespondent = [];
    let tempName = "";
    caseLinks.forEach((url, index) => {
      tempObj = {};
      rp(url)
        .then(res => {
          let final = cheerio.load(res);
          return final;
        })
        .then($ => {
          tempName = 'Case ' + index
          tempHold = {}
          tempPetitioner = [];
          tempRespondent = [];
          $(`tr.color6`)
            .find(`a`)
            .attr(`title`, (i, val) => {
              // if (val.substring(6, 11) === "amici") {
              //   tempPetitioner.push(val.substring(22, val.length - 7));
              // } else if (val.substring(6, 12) === "amicus") {
              //   tempPetitioner.push(val.substring(23, val.length - 7));
              // } else if (val.substring(0, 19) === "Brief of respondent") {
              //   tempPetitioner.push(val.substring(20, val.length - 7));
              // } else if (val.substring(0, 19) === "Brief of petitioner") {
              //   tempPetitioner.push(val.substring(20, val.length - 7));
              // } else {
              //   tempPetitioner.push(val);
              // }
              // console.log(val.replace('Brief amicus curiae ', ''))
              tempPetitioner.push(val.replace('Brief amici curiae of ', '').replace('Brief amicus curiae of ', '').replace(' filed.', '').replace(' (Distributed)', '')
              .replace(' VIDED.', ''))
            });
          $(`tr.color7`)
            .find(`a`)
            .attr(`title`, (i, val) => {
              tempRespondent.push(val.replace('Brief amici curiae of ', '').replace('Brief amicus curiae of ', '').replace(' filed.', '').replace(' (Distributed)', '')
              .replace(' VIDED.', ''))
              // if (val.substring(6, 11) === "amici") {
              //   tempRespondent.push(val.substring(22, val.length - 7));
              // } else if (val.substring(6, 12) === "amicus") {
              //   tempRespondent.push(val.substring(23, val.length - 7));
              // } else if (val.substring(0, 19) === "Brief of respondent") {
              //   tempRespondent.push(val.substring(20, val.length - 7));
              // } else if (val.substring(0, 19) === "Brief of petitioner") {
              //   tempRespondent.push(val.substring(20, val.length - 7));
              // } else {
              //   tempRespondent.push(val);
              // }
            });
            tempHold['Respondent'] = tempRespondent
            tempHold['Petitioner'] = tempPetitioner
            tempObj[tempName] = tempHold
            console.log(tempObj)
        });
    });
  });