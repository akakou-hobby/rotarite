const firebaseConfig = {
  apiKey: "AIzaSyDs6KIoUnAwCs1hDuIE-ZxxKZSQVMD09kw",
  authDomain: "rotarite-f63f1.firebaseapp.com",
  databaseURL: "https://rotarite-f63f1.firebaseio.com",
  projectId: "rotarite-f63f1",
  storageBucket: "rotarite-f63f1.appspot.com",
  messagingSenderId: "1039269529152",
  appId: "1:1039269529152:web:9b4eed34f5d42a461341a5",
  measurementId: "G-J5E5G995V7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const currentUser = () => {
  return firebase.auth().currentUser;
};
