class Like extends FirestoreObject {
  constructor({ id = null, sceneId = null, isEnable = true }) {
    super();
    this.id = id;
    this.sceneId = sceneId;
    this.isEnable = isEnable;
  }

  data() {
    return {
      id: this.id,
      sceneId: this.sceneId,
      isEnable: this.isEnable
    };
  }
}

class LikeRepository extends FirestoreObjectRepository {
  constructor() {
    super(Like);
  }

  create({ sceneId = null }) {
    const like = new Like({
      id: sceneId,
      sceneId: sceneId
    });

    this.store(like);
    return like;
  }

  async findActiveMineById(sceneId) {
    const db = firebase.firestore();
    const uid = currentUser().uid;

    const snapshots = await db
      .collection("users")
      .doc(uid)
      .collection("like")
      .where("sceneId", "==", sceneId)
      .where("isEnable", "==", true)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return data ? new Like(data) : null;
  }

  async countLikesForScene(scene) {
    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup("like")
      .where("sceneId", "==", scene.id)
      .get();

    var count = 0;
    snapshots.forEach(doc => {
      count++;
    });

    return count;
  }
}
