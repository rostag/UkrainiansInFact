import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

admin.initializeApp();

export const getAllUsers = functions.https.onCall(async (data) => {
  const result: any = [];
  return getAuth()
    .listUsers(data.numberOfUsers)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        result.push(userRecord);
      });
      return result;
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
});

export const getUserById = functions.https.onCall(async (data) => {
  return getAuth()
    .getUser(data.uid)
    .then((getUserResult) => getUserResult)
    .catch((error) => {
      console.log("Error getting user:", error);
    });
});

// Lookup the user associated with the specified uid.
export const getUserClaims = functions.https.onCall(async (data) => {
  return getAuth()
    .getUser(data.uid)
    .then((userRecord) => {
      return userRecord.customClaims;
    })
    .catch((error) => {
      functions.logger.log("Error getUserClaims: ", error);
    });
});

// Set user roles on the user corresponding to uid.
export const setUserClaims = functions.https.onCall(async (data: { uid: string, claims: any }) => {
  return getAuth()
    .setCustomUserClaims(data.uid, data.claims)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("Error set User Claims on call: ", error);
    });
});

export const processSignUp = functions.auth.user().onCreate(async (user) => {
  if (
    user.email &&
    user.email.endsWith("siryk@gmail.com") &&
    user.emailVerified
  ) {
    const customClaims = {
      admin: true,
      accessLevel: 9,
    };
    try {
      // Set custom user claims on this newly created user.
      await getAuth().setCustomUserClaims(user.uid, customClaims);

      // Update real-time database to notify client to force refresh.
      const metadataRef = getDatabase().ref("metadata/" + user.uid);

      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      await metadataRef.set({ refreshTime: new Date().getTime() });
    } catch (error) {
      console.log(error);
    }
  }
});

const addMessage = functions.https.onRequest(async (req, res) => {
  const orig = req.query.text;
  const result = await admin.firestore().collection("messages").add({ original: orig });
  res.json({ result: "Message with ID: " + result.id + "added" });
});

const makeUppercase = functions.firestore.document("/messages/{documentId")
  .onCreate((snap, context) => {
    const orig = snap.data().original;
    functions.logger.log("Uppercasing", context.params.documentId, orig);
    const uppercase = orig.toUppperCase();
    return snap.ref.set({ uppercase }, { merge: true });
  });

const test = () => {
  const a = addMessage;
  const b = makeUppercase;
  console.log('a:', a, 'b:', b);
};

test();

// // Verify the ID token first.
// getAuth()
//   .verifyIdToken(idToken)
//   .then((claims) => {
//   if (claims.admin === true) {
//     // Allow access to requested admin resource.
//   }
// });
