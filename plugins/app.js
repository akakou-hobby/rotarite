import firebase from "firebase/app";
import "firebase/auth";

import getParameter from "get-parameter";

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
    const data = db.collection("scene").doc(sceneId);
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

    console.log(currentUser);

    console.log(`${now}`);
    console.log(scene.data);

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

    this.store(scene);
    return scene;
  }
}

const sceneRepo = new SceneRepository();

class Novel {
  constructor(data) {
    this.data = data;
  }
}

class NovelRepository {
  constructor() {}
  create({ title = null, summary = null, rootContent = null }) {
    const scaneRepo = new SceneRepository();

    const date = new Date();
    const now = date.getTime();

    const root = scaneRepo.create({
      content: rootContent,
      novel: {
        data: {
          id: now
        }
      },
      prev: null
    });

    const novel = new Novel({
      id: now,
      title: title,
      summary: summary,
      root: root.data.id
    });

    this.store(novel);
    return novel;
  }
  store(novel) {
    const db = firebase.firestore();

    const date = new Date();
    const now = date.getTime();

    const currentUser = getCurrentUser();

    db.collection("users")
      .doc(currentUser.uid)
      .collection("novel")
      .doc(novel.data.id)
      .set(novel.data);
  }

  async findById(novelId) {
    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup("novel")
      .where("id", "==", novelId)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return new Novel(data);
  }
}

const getCurrentNovel = async () => {
  const novelStringId = getParameter("novel");
  const novelId = Number(novelStringId);

  if (novelId) {
    const novelRepo = new NovelRepository();
    return await novelRepo.findById(novelId);
  }
};

export default ({}, inject) => {
  inject("firebase", firebase);

  inject("Scene", Scene);
  inject("SceneRepository", SceneRepository);

  inject("Novel", Novel);
  inject("NovelRepository", NovelRepository);

  inject("currentUser", getCurrentUser);
  inject("currentNovel", getCurrentNovel);
};
