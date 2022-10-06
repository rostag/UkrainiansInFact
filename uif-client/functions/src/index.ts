import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addMessage = functions.https.onRequest(async (req, res) => {
  const orig = req.query.text;
  const writeResult = await admin.firestore().collection('messages').add({original: orig});
  res.json({result: 'Message with ID: ' + writeResult.id + 'added'});
});

export const makeUppercase = functions.firestore.document('/messages/{documentId')
.onCreate((snap, context) => {
  const orig = snap.data().original;
  functions.logger.log('Uppercasing', context.params.documentId, orig);
  const uppercase = orig.toUppperCase();
  return snap.ref.set({uppercase}, {merge: true});
})