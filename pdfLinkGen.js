const cheerio = require("cheerio");
const rp = require("request-promise");
const arr = require("./caseLinksArr");


arr.links.forEach((val, i) => {
  rp(val)
    .then(res => {
      let final = cheerio.load(res);
      return final;
    })
    .then($ => {
      let certArr = [];
      let petArr = [];
      let resArr = [];
      let usArr = [];

      $(`tr.color6`)
        .find(`a`)
        .attr(`href`, (i, val) => {
          if (val.indexOf('www.supremecourt.gov') === -1)
          petArr.push(val);
        });

      $(`tr.color2`)
        .find(`a`)
        .attr(`href`, (i, val) => {
          if (val.indexOf('www.supremecourt.gov') === -1)
          certArr.push(val);
        });

      $(`tr.color7`)
        .find(`a`)
        .attr(`href`, (i, val) => {
          if (val.indexOf('www.supremecourt.gov') === -1)
          resArr.push(val);
        });
      $(`tr.color9`)
        .find(`a`)
        .attr(`href`, (i, val) => {
          if (val.indexOf('www.supremecourt.gov') === -1)
          usArr.push(val);
        });

      return [i, petArr, resArr, certArr, usArr];
    })
    .then(stuff => {
      console.log(stuff)
    });
});
