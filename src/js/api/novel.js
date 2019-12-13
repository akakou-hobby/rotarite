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

const currentNovel = async () => {
  const novelStringId = getParameter("novel");
  const novelId = Number(novelStringId);

  if (novelId) {
    const novelRepo = new NovelRepository();
    return await novelRepo.findById(novelId);
  }
};
