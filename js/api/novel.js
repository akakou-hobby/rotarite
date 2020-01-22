/**
 * 小説を表すクラス
 * @author akakou
 */
class Novel extends FirestoreObject {
  /**
   * コンストラクタ
   * @param {Object} args 引数
   * @param {String} args.title 小説のタイトル
   * @param {String} args.summary 小説の説明
   * @param {Scene} args.root 一番最初のシーン
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
   * @override
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
   * @override
   * @param {Object} args 引数
   * @param {String} args.title 小説のタイトル
   * @param {String} args.summary 小説の説明
   * @param {Scene} args.root 一番最初のシーン
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
