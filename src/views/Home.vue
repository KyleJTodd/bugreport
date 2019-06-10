<template>
  <div class="home container">

    <CreateBug />
    <bugs />
  </div>
</template>

<script>
  import Bugs from "@/components/Bugs.vue"
  import CreateBug from "@/components/CreateBug.vue"

  export default {
    name: 'home',
    mounted() {
      this.$store.dispatch("getBugs");
    },
    computed: {


    },
    components: {
      Bugs,
      CreateBug
    }
  }
</script>