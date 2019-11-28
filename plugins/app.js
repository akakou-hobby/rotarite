import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/analytics";
import "firebase/firestore";

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

class Scene {
  constructor(data) {
    this.data = data;
  }
}

class SceneRepository {
  constructor() {}

  findById(sceneId) {
    const data = db.collection("scenes").doc(sceneId);
    return new Scene(data);
  }

  findNext(scene) {
    const nextId = scene.next;
    return new this.findById(nextId);
  }

  store(scene) {
    const db = firebase.firestore();

    const date = new Date();
    const now = date.getTime();

    const currentUser = getCurrentUser();

    db.collection("users")
      .doc(currentUser.uid)
      .collection("scene")
      .doc(`${now}`)
      .set(scene.data);
  }

  create({ content = null, prev = null, novel = null }) {
    const date = new Date();
    const now = date.getTime();

    const prevId = prev ? prev.data.id : null;
    const novelId = novel ? novel.data.id : null;

    const scene = new Scene({
      id: now,
      content: content,
      prevId: prevId,
      novelId: novelId
    });

    console.log(this.store);
    this.store(scene);
    return scene;
  }
}

const sceneRepo = new SceneRepository();

export default ({}, inject) => {
  inject("firebase", firebase);
  inject("Scene", Scene);
  inject("SceneRepository", SceneRepository);
  inject("currentUser", getCurrentUser);
};
