import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/database";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

const firebaseConfig = {
  apiKey: "AIzaSyCtfYin0cSBvxFMhlldc1-yo8eGgY1HvoI",
  authDomain: "chunvocab.firebaseapp.com",
  projectId: "chunvocab",
  storageBucket: "chunvocab.appspot.com",
  messagingSenderId: "779217197530",
  appId: "1:779217197530:web:d2b282298f9f440da188e3",
  databaseURL: "https://chunvocab-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
console.log(dbRef.child("a"));
dbRef
  .child("a")
  .get()
  .then((r) => {
    console.log(r);
  });
