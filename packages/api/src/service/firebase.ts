import { initializeApp, firestore as _firestore } from "firebase-admin";

initializeApp();

export const firestore = _firestore();
