<template>
  <div>
    <p>text content</p>
    <textarea v-model="content"></textarea>
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
      const sceneRepo = new this.$SceneRepository();

      sceneRepo.create({
        content: this.content,
        novel: this.novel,
        prev: null
      });

      location.href = "/";
    }
  },
  mounted() {},
  data() {
    return {
      content: "",
      novel: {
        data: {
          id: 10
        }
      }
    };
  }
};
</script>

<style></style>
