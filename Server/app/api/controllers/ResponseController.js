
/**
 * ResponseController
 *
 * @description :: Server-side logic for managing Response
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
  console.log("inside async func");
  try {
    await collection.createEach(data);
    console.log("done");

    return 'success';
  } catch(err) {
    console.error(err);
  }

};

module.exports = {
  dumpResponses: async function (req, res) {
    const sampleResponse = [
      'surveyId',
      'clientId',
      'questionText',
      'response',
      'questionType',
      'responseId',
      'rawData'
    ];
    const data = req.body.responses;
    const config = req.body.config;
    // const data = R.uniq(responses);
    const isAttrType = R.propEq("type", "attribute");
    const attrs = R.pipe(
      R.filter(isAttrType),
      R.map(x => ({[x["attribute"]]: x["response"]})),
      R.mergeAll
    )(data);

    const final = R.pipe(
      R.reject(isAttrType),
      R.map(x => ({[x["metric"]]: x["response"]})),
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