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
