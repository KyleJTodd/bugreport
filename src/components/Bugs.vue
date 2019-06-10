<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Creator</th>
        <th scope="col">Description</th>
        <th scope="col">Date</th>
        <th scope="col"> Ticket Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bug in bugs" :key="bug._id">
        <router-link :to="{ name: 'bug', params: {id: bug._id}}">
          <th scope="row">{{bug.title}}</th>
        </router-link>
        <td>{{bug.creator}}</td>
        <td>{{bug.description}}</td>
        <td>{{new Date(bug.createdAt).toLocaleDateString()}}</td>
        <td v-if="bug.closed == false" class="open">Open</td>
        <td v-else="bug.closed == true" class="closed">Closed</td>
      </tr>
    </tbody>
  </table>
  </div>


</template>

<script>
  export default {
    name: "Bugs",
    data() {
      return {};
    },
    computed: {
      bugs() {
        return this.$store.state.bugs;
      },
    },


    methods: {
      activeStatus() {
        if (bug.closed == false) {
          bug.closed == "Open"
        }
      }
    }
  }

</script>

<style>
  .closed {
    color: white;
    background-color: red;
  }

  .open {
    color: white;
    background-color: green;
  }
</style>