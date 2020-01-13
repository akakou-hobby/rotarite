/**
 * シーンを表すクラス
 * @author akakou
 */
class Scene extends FirestoreObject {
  /**
   * コンストラクタ
   */
  constructor({ id = null, content = null, prevId = null, novelId = null }) {
    super();
    this.id = id;
    this.content = content;
    this.prevId = prevId;
    this.novelId = novelId;
  }

  /**
   * JSON化したデータを取得するメソッド
   */
  data() {
    return {
      id: this.id,
      content: this.content,
      prevId: this.prevId,
      novelId: this.novelId
    };
  }
}

/**
 * シーンを表すオブジェクトのリポジトリクラス
 */
class SceneRepository extends FirestoreObjectRepository {
  /**
   * コンストラクタ
   */
  constructor() {
    super(Scene);
  }

  /**
   * sceneの次のシーンを取得
   */
  async findNext(scene, count) {
    if (!count) count = 10;

    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup(this.repositoryName)
      .where("prevId", "==", scene.id)
      .orderBy("id", "desc")
      .limit(count)
      .get();

    var scenes = [];
    snapshots.forEach(doc => {
      const scene = new Scene(doc.data());
      scenes.push(scene);
    });

    return scenes;
  }

  /**
   * novelからシーン一覧を取得
   */
  async findByNovel(novel, count) {
    if (!count) count = 10;

    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup(this.repositoryName)
      .where("novelId", "==", novel.id)
      .get();

    var scenes = [];
    snapshots.forEach(doc => {
      const scene = new Scene(doc.data());
      scenes.push(scene);
    });

    return scenes;
  }

  /**
   * シーンを生成して保存する
   */
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

/**
 * @todo この関数を消す
 */
const currentScene = async () => {
  const sceneStringId = getParameter("scene");
  const sceneId = Number(sceneStringId);

  if (sceneId) {
    const sceneRepo = new SceneRepository();
    return await sceneRepo.findById(sceneId);
  }
};
