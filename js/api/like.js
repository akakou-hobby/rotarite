/**
 * 投稿に対する高評価に関する実装
 * @author akakou
 */

/**
 * 投稿に対する高評価を表すオブジェクト
 */
class Like extends FirestoreObject {
  /**
   * コンストラクタ
   */
  constructor({ id = null, sceneId = null, isEnable = true }) {
    super();
    this.id = id;
    this.sceneId = sceneId;
    this.isEnable = isEnable;
  }

  /**
   * JSON化したデータを取得するメソッド
   */
  data() {
    return {
      id: this.id,
      sceneId: this.sceneId,
      isEnable: this.isEnable
    };
  }
}

/**
 * 投稿に対する高評価を扱うリポジトリクラス
 */
class LikeRepository extends FirestoreObjectRepository {
  constructor() {
    super(Like);
  }

  /**
   * 投稿に対する高評価オブジェクトを生成して保存する
   */
  create({ sceneId = null }) {
    const like = new Like({
      id: sceneId,
      sceneId: sceneId
    });

    this.store(like);
    return like;
  }

  /*
   * sceneIdからlike一覧を取得する
   */
  async findActiveMineById(sceneId) {
    const db = firebase.firestore();
    const uid = currentUser();

    const snapshots = await db
      .collection("users")
      .doc(uid)
      .collection("like")
      .where("sceneId", "==", sceneId)
      .where("isEnable", "==", true)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return data ? new Like(data) : null;
  }

  /**
   * sceneに対するlikeの数を取得する
   */
  async countLikesForScene(scene) {
    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup("like")
      .where("sceneId", "==", scene.id)
      .get();

    var count = 0;
    snapshots.forEach(doc => {
      count++;
    });

    return count;
  }
}
