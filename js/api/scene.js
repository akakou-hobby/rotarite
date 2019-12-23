class Scene extends FirestoreObject {
  constructor({ id = null, content = null, prevId = null, novelId = null }) {
    super();
    this.id = id;
    this.content = content;
    this.prevId = prevId;
    this.novelId = novelId;
  }

  data() {
    return {
      id: this.id,
      content: this.content,
      prevId: this.prevId,
      novelId: this.novelId
    };
  }
}

class SceneRepository extends FirestoreObjectRepository {
  constructor() {
    super(Scene);
  }

  findNext(scene) {
    const nextId = scene.next;
    return new this.findById(nextId);
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
