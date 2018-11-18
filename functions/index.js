'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug';

exports.dialogflow_explore = functions.https.onRequest((request, response) => {
  console.log('webhook started');
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  // const chat = "here is a sample response: test 1";
  //
  // response.setHeader('Content-Type','applicaiton/json');
  // response.send(JSON.stringify({"fulfillmentText": chat}));

  function roomIntentHandler(agent) {
   agent.add('no rooms available');
  }

  function welcome(agent) {
    agent.add('hi there!');
  }

  function fallback(agent) {
    agent.add('fallback');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Room', roomIntentHandler);

  agent.handleRequest(intentMap);
});
