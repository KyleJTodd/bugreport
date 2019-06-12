<template>
  <div class="bug-creator">
    <form @submit.prevent="handleSubmit" class="bug-form">
      <input type="text" placeholder="Your Name" v-model="creator">
      <input type="text" placeholder="Title" v-model="title">
      <textarea type="text" placeholder="Description" v-model="description" class="descform"></textarea>
      <button type="submit">Add Bug</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "BugCreator",
    data() {
      return {
        creator: "",
        description: "",
        title: ""
      }
    },

    methods: {
      handleSubmit() {
        let data = {
          creator: this.creator,
          description: this.description,
          title: this.title
        }
        this.$store.dispatch('createBug', data)
      }
    }
  }
</script>

<style>
  .descform {

    display: block;
    margin: auto;
  }
</style>