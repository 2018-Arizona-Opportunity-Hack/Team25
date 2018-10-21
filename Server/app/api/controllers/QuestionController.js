
/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Question
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// const trial = await sails.models.Survey.find({
//    foo: "bar"
//  })

const R = require('ramda');

const dumpToDB = async (data, collection) => {
  // Data is [{}, {}. ...]
  // collection.native(function (err, collection) {
  //   var bulk = collection.initializeOrderedBulkOp();
  //   bulk.insert()
  // });
  try {
    await collection.createEach(data);
    return 'success';
  } catch(err) {
    console.error(err);
  }

};

module.exports = {
  dumpQuestions: async function (req, res) {
    const sampleQuestion = [
      'surveyId',
      'clientId',
      'questionText',
      'Question',
      'questionType',
      'QuestionId',
      'rawData'
    ];
    const data = req.body.Questions;
    const config = req.body.config;
    // const data = R.uniq(Questions);
    const isAttrType = R.propEq("type", "attribute");
    const attrs = R.pipe(
      R.filter(isAttrType),
      R.map(x => ({[x["attribute"]]: x["Question"]})),
      R.mergeAll
    )(data);

    const final = R.pipe(
      R.reject(isAttrType),
      R.map(x => ({[x["metric"]]: x["Question"]})),
      // R.mergeAll,
      R.map(R.merge(attrs)),
      R.map(R.merge(config))
    )(data);
      
    const result = await dumpToDB(final, Survey);
    // const final = R.map(attr => R.merge(attr, metrics), attrs)[0];
    return res.json(result);
  },



};

{

}