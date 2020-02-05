import * as functions from "firebase-functions";

export const app = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
