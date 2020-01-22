/**
 * firebaseの設定関連とユーザ関連
 * @author akakou
 */

firebase.initializeApp(CONFIG.FIREBASE);
firebase.analytics();

/**
 * 現在ログインしているユーザのuidを取得
 */
const currentUser = () => {
  try {
    return firebase.auth().currentUser.uid;
  } catch (e) {
    console.log(e);
    return null;
  }
};
