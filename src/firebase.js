import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAAF1QW_wzIHddKGmT-UNGiYyaPpc2EBTk",
  authDomain: "tree-health-394.firebaseapp.com",
  databaseURL: "https://tree-health-394.firebaseio.com",
  projectId: "tree-health-394",
  storageBucket: "tree-health-394.appspot.com",
  messagingSenderId: "1042296247589",
  appId: "1:1042296247589:web:05afbbaac6244ce79036cc",
  measurementId: "G-5SJ492GQ3H"
};

firebase.initializeApp(firebaseConfig);

export default firebase;