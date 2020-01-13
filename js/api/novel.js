/**
 * 小説を表すクラス
 */
class Novel extends FirestoreObject {
  /**
   * コンストラクタ
   */
  constructor({ id = null, title = null, summary = null, rootId = null }) {
    super();
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.rootId = rootId;
  }

  /**
   * JSON化したデータを取得するメソッド
   */
  data() {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      rootId: this.rootId
    };
  }
}

/**
 * 小説を表すオブジェクトのリポジトリクラス
 */
class NovelRepository extends FirestoreObjectRepository {
  /**
   * コンストラクタ
   */
  constructor() {
    super(Novel);
  }

  /**
   * 小説を生成して保存する
   */
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

/**
 * @todo この関数を消す
 */
const currentNovel = async () => {
  const novelStringId = getParameter("novel");
  const novelId = Number(novelStringId);

  if (novelId) {
    const novelRepo = new NovelRepository();
    return await novelRepo.findById(novelId);
  }
};
