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

export default {
  methods: {
    login() {
      const firebase = this.$firebase();

      this.$firebase()
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  },
  mounted() {
    this.$firebase()
      .auth()
      .onAuthStateChanged(user => {
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
