class Novel {
  constructor({ id = null, title = null, summary = null, root = null }) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.root = root;
  }

  data() {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      root: this.root
    };
  }
}

class NovelRepository {
  constructor() {}
  create({ title = null, summary = null, root = null }) {
    const scaneRepo = new SceneRepository();

    const date = new Date();
    const now = date.getTime();

    root.id = now;
    root.prevId = null;

    scaneRepo.store(root);

    const novel = new Novel({
      id: now,
      title: title,
      summary: summary,
      root: root.id
    });

    this.store(novel);
    return novel;
  }
  store(novel) {
    const db = firebase.firestore();
    const uid = currentUser().uid;

    db.collection("users")
      .doc(uid)
      .collection("novel")
      .doc(novel.id.toString())
      .set(novel.data());
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

const currentNovel = async () => {
  const novelStringId = getParameter("novel");
  const novelId = Number(novelStringId);

  if (novelId) {
    const novelRepo = new NovelRepository();
    return await novelRepo.findById(novelId);
  }
};
