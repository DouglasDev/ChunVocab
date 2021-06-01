import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtfYin0cSBvxFMhlldc1-yo8eGgY1HvoI",
  authDomain: "chunvocab.firebaseapp.com",
  projectId: "chunvocab",
  storageBucket: "chunvocab.appspot.com",
  messagingSenderId: "779217197530",
  appId: "1:779217197530:web:d2b282298f9f440da188e3",
  databaseURL: "https://chunvocab-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
// console.log(firebase)
const dbRef = firebase.database().ref();

export default dbRef;
