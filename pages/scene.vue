<template>
  <div>
    <h2>id</h2>
    <p>{{ scene.id }}</p>

    <h2>novel</h2>
    <p>{{ scene.novelId }}</p>

    <h2>prev</h2>
    <p>{{ scene.prevId }}</p>

    <h2>content</h2>
    <p>{{ scene.content }}</p>
    <br />
    <button type="button" value="submit" v-on:click="submit()">読む</button>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {}
  },
  async mounted() {
    const scene = await this.$currentScene();

    console.log("scene");
    if (scene) {
      this.scene = scene.data;
    }
  },
  data() {
    return {
      scene: {
        id: 0,
        novelId: "",
        content: "",
        prevId: ""
      }
    };
  }
};
</script>

<style></style>
