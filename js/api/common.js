/**
 * Firestoreで扱うオブジェクト（novel、scene）、その周りの処理についての実装
 * @auther akakou
 */

/**
 * Firestoreで扱うオブジェクトの抽象クラス
 */
class FirestoreObject {
  constructor() {}

  data() {
    throw new Error("Not Implemented Yet");
  }
}

/**
 * Firestoreで扱うオブジェクトを操作するリポジトリクラスの抽象クラス
 */
class FirestoreObjectRepository {
  constructor(firestoreObjectClass) {
    this.firestoreObjectClass = firestoreObjectClass;
    this.repositoryName = firestoreObjectClass.name.toLowerCase();
  }

  create() {
    throw new Error("Not Implemented Yet");
  }

  /**
   * Firestoreで扱うオブジェクトを保存する。
   * @param {FirestoreObject} collectionObject 保存するオブジェクト
   */
  store(collectionObject) {
    const db = firebase.firestore();
    const uid = currentUser();

    db.collection("users")
      .doc(uid)
      .collection(this.repositoryName)
      .doc(collectionObject.id.toString())
      .set(collectionObject.data())
      .then(() => {
        console.log(`${collectionObject.id} successfully written!`);
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * IDに対応するcollectionObjectを取得する。
   * @param {Number} collectionObjectId
   */
  async findById(collectionObjectId) {
    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup(this.repositoryName)
      .where("id", "==", collectionObjectId)
      .get();

    var data = null;
    snapshots.forEach(doc => {
      data = doc.data();
    });

    return new this.firestoreObjectClass(data);
  }

  /**
   * すべてのcollectionObjectを取得する。
   * @param {Number} count 取得する件数
   */
  async getList(count) {
    if (!count) count = 10;

    const db = firebase.firestore();

    const snapshots = await db
      .collectionGroup(this.repositoryName)
      .orderBy("id", "desc")
      .limit(count)
      .get();

    var firestoreObjectList = [];
    snapshots.forEach(doc => {
      const firestoreObject = new this.firestoreObjectClass(doc.data());
      firestoreObjectList.push(firestoreObject);
    });

    return firestoreObjectList;
  }
}
