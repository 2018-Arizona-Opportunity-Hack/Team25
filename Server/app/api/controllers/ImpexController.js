const R = require('ramda');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const _csv=require('csvtojson');
// const json2csv = require('json2csv');

module.exports = {
  export: async (req, res) => {
    console.log(json2csv)
    try {
      const allData = await Response.find();
      const fields = R.keys(allData[0]);
      const opts = { fields };
      try {
        const csv = json2csv(allData, opts);
        // json2csv({fields: opts, data: allData}, (err, csv) => {
        //   if (err) {
        //     res.serverError(err);
        //   }
        // });
        console.log("csv: ", csv);
        const filename = "export.csv";
        res.attachment(filename);
        res.end(csv, 'UTF-8');
        // console.log("allData: ", allData);
      } catch (err) {
        res.serverError(err);
      }

    } catch (error) {
      res.serverError(error);
    }
  },

  import: async (req, res) => {
    const file = req.file('export').upload((err, csvfile) => {
      console.log("data: ", ((csvfile[0].fd)));
      if (err) return res.serverError(err);
      _csv().fromFile(csvfile[0].fd)
        .then(async (jsonObj) => {
          try {
            const data = R.map(x => { x.createdAt = new Date(x.createdAt); return x;}, jsonObj);
            await Response.destroy({});
            await Response.createEach(data);
            return res.json('success');
          } catch (err) {
            return res.serverError(err);
          }
        })
        .catch(err => res.serverError(err));
      // return res.json({
      //   files: data
      // })
    })

  }
};