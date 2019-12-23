class Like extends FirestoreObject {
  constructor({ id = null, sceneId = null }) {
    super();
    this.id = id;
    this.sceneId = sceneId;
  }

  data() {
    return {
      id: this.id,
      sceneId: this.sceneId
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

  async findMineById(sceneId) {
    const db = firebase.firestore();
    const uid = currentUser().uid;

    const snapshots = await db
      .collection("users")
      .doc(uid)
      .collection("like")
      .where("sceneId", "==", sceneId)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return new Like(data);
  }
}
