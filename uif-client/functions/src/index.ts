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
        console.log("user", userRecord.toJSON());
        result.push(userRecord);
      });
      return result;
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
});

export const processSignUp = functions.auth.user().onCreate(async (user) => {
  console.log("user created: ", user);
  // Check if user meets role criteria.
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

export const addMessage = functions.https.onRequest(async (req, res) => {
  const orig = req.query.text;
  const result = await admin.firestore().collection("messages").add({ original: orig });
  res.json({ result: "Message with ID: " + result.id + "added" });
});

export const makeUppercase = functions.firestore.document("/messages/{documentId")
  .onCreate((snap, context) => {
    const orig = snap.data().original;
    functions.logger.log("Uppercasing", context.params.documentId, orig);
    const uppercase = orig.toUppperCase();
    return snap.ref.set({ uppercase }, { merge: true });
  });

// Set admin privilege on the user corresponding to uid.
export const setUserClaims = functions.https.onCall(async (uid: string, claims: any) => {
  return getAuth()
    .setCustomUserClaims(uid, {admin: true})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("Error setUserClaims: ", error);
    });
});

// Lookup the user associated with the specified uid.
export const getUserClaims = functions.https.onCall(async (uid: string) => {
  return getAuth()
    .getUser(uid)
    .then((userRecord) => {
      console.log(userRecord?.customClaims);
      return userRecord.customClaims;
    })
    .catch((error) => {
      console.log("Error getUserClaims: ", error);
    });
});

// // Verify the ID token first.
// getAuth()
//   .verifyIdToken(idToken)
//   .then((claims) => {
//   if (claims.admin === true) {
//     // Allow access to requested admin resource.
//   }
// });
