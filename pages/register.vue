<template>
  <div>
    <p>user name</p>
    <input v-model="email" placeholder="taro@example.com" />
    <br />
    <p>password</p>
    <input type="password" v-model="password" />
    <br />
    <button type="button" value="submit" v-on:click="login()">ログイン</button>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

var firebaseConfig = {
  apiKey: "AIzaSyDs6KIoUnAwCs1hDuIE-ZxxKZSQVMD09kw",
  authDomain: "rotarite-f63f1.firebaseapp.com",
  databaseURL: "https://rotarite-f63f1.firebaseio.com",
  projectId: "rotarite-f63f1",
  storageBucket: "rotarite-f63f1.appspot.com",
  messagingSenderId: "1039269529152",
  appId: "1:1039269529152:web:9b4eed34f5d42a461341a5",
  measurementId: "G-J5E5G995V7"
};

export default {
  methods: {
    login() {
      console.log(this.email);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  },
  mounted() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        location.href = "/";
      } else {
      }
    });
  },
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>

<style></style>
