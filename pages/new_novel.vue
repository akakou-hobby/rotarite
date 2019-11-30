<template>
  <div>
    <p>title</p>
    <input v-model="title" />
    <br />
    <p>summary</p>
    <textarea v-model="summary"></textarea>
    <br />
    <button type="button" value="submit" v-on:click="submit()">投稿</button>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
// import firebase from "app";

// const app = firebase.init();
export default {
  methods: {
    submit() {
      const novelRepo = new this.$NovelRepository();

      novelRepo.create({
        title: this.title,
        summary: this.summary,
        rootContent: this.content
      });

      location.href = "/";
    }
  },
  mounted() {},
  data() {
    return {
      content: "",
      title: "",
      summary: ""
    };
  }
};
</script>

<style></style>
