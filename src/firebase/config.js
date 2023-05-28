import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyDk9cqMDmhiG0nso7SeNity6sP43cHF0jY",
  authDomain: "poinext.firebaseapp.com",
  projectId: "poinext",
  storageBucket: "poinext.appspot.com",
  messagingSenderId: "978054070149",
  appId: "1:978054070149:web:2be579288f27a3e7234eec",
  measurementId: "G-9DZLNGXTFX"
})

const docId = process.env.docId
const ref = doc(collection(getFirestore(app), 'poicount'), docId);

export { ref }
