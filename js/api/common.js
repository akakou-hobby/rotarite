class FirestoreObject {
  constructor() {}

  data() {
    throw new Error("Not Implemented Yet");
  }
}

class FirestoreObjectRepository {
  constructor(firestoreObjectClass) {
    this.firestoreObjectClass = firestoreObjectClass;
    this.repositoryName = firestoreObjectClass.name.toLowerCase();
  }

  create() {
    throw new Error("Not Implemented Yet");
  }

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
