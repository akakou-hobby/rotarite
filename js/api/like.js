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
    const date = new Date();
    const now = date.getTime();

    const like = new Like({
      id: now,
      sceneId: sceneId
    });

    this.store(like);
    return like;
  }
}
