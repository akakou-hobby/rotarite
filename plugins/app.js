import * as firebase from "firebase";

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
  firebase.analytics();
}

const initFirebase = () => {
  return firebase;
};

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

class Scene {
  constructor(data, content = "") {
    if (data) {
      this.data = data;
    } else {
      const date = new Date();
      const now = date.getTime();

      this.data = {
        time: now,
        content: content
      };
    }
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
}

const sceneRepo = new SceneRepository();

export default ({}, inject) => {
  inject("firebase", initFirebase);
  inject("Scene", Scene);

  inject("SceneRepository", sceneRepo);
  inject("currentUser", getCurrentUser);
};
