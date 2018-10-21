
/**
 * SurveysController
 *
 * @description :: Server-side logic for managing Surveys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// const trial = await sails.models.Survey.find({
//    foo: "bar"
//  })

module.exports = {
  getSurveys: async function (req, res) {
    const data = await Survey.find({
      foo: "bar"
    });
    // const data = await Survey.find();
    // return res.json({data: "hey"});
    return res.json({data});
  },
  
};
