const R = require('ramda');
const fs = require('fs');
const json2csv = require('json2csv').parse;
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

  }
};