
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
  
  create: async (req, res) => {
    const survey = req.body.survey;
    try {
      await Survey.create(survey);
      return res.json("success");
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }

  },

  getAll: async (req, res) => {
    const params = req.param('params');
    if (!params) {
      // fetch all
    }
    try {
      const data = await Survey.find();
      return res.json(data);
    } catch (err) {
      return res.serverError(err);
    }
  },

  get: async (req, res) => {
    const id = req.param('params');
    console.log("params: ", id);
    try {
      const data = await Survey.find({id: id});
      return res.json(data);
    } catch (err) {
      return res.serverError(err);
    }
  },

  delete: async (req, res) => {
    const id = req.param('params');
    console.log("params: ", id);
    try {
      await Survey.destroy({id: id});
      const data = await Survey.find();
      return res.json(data);
    } catch (err) {
      return res.serverError(err)
    }
  }

};
