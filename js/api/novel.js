class Novel extends FirestoreObject {
  constructor({ id = null, title = null, summary = null, rootId = null }) {
    super();
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.rootId = rootId;
  }

  data() {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      rootId: this.rootId
    };
  }
}

class NovelRepository extends FirestoreObjectRepository {
  constructor() {
    super(Novel);
  }

  create({ title = null, summary = null, root = null }) {
    const scaneRepo = new SceneRepository();

    const date = new Date();
    const now = date.getTime();

    root.id = now;
    root.novelId = now;
    root.prevId = null;

    scaneRepo.store(root);

    const novel = new Novel({
      id: now,
      title: title,
      summary: summary,
      rootId: root.id
    });

    this.store(novel);
    return novel;
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
