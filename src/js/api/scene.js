class Scene {
  constructor({ id = null, content = null, prevId = null, novelId = null }) {
    this.id = id;
    this.content = content;
    this.prevId = prevId;
    this.novelId = novelId;
  }
}

class SceneRepository {
  constructor() {}

  async findById(sceneId) {
    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup("scene")
      .where("id", "==", sceneId)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return new Scene(data);
  }

  findNext(scene) {
    const nextId = scene.next;
    return new this.findById(nextId);
  }

  store(scene) {
    const db = firebase.firestore();
    const currentUser = getCurrentUser();

    db.collection("users")
      .doc(currentUser.uid)
      .collection("scene")
      .doc(`${scene.id}`)
      .set(scene);
  }

  create({ content = null, prevId = null, novelId = null }) {
    const date = new Date();
    const now = date.getTime();

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

const currentScene = async () => {
  const sceneStringId = getParameter("scene");
  const sceneId = Number(sceneStringId);

  if (sceneId) {
    const sceneRepo = new SceneRepository();
    return await sceneRepo.findById(sceneId);
  }
};
