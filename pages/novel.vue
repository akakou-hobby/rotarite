<template>
  <div>
    <h2>title</h2>
    <p>{{ novel.title }}</p>
    <h2>summary</h2>
    <p>{{ novel.summary }}</p>
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
    const novel = await this.$currentNovel();

    console.log("novel");
    if (novel) {
      this.novel = novel.data;
    }
  },
  data() {
    return {
      novel: {
        title: "",
        summary: ""
      }
    };
  }
};
</script>

<style></style>
