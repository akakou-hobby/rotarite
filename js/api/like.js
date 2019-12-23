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
}
