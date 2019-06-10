<template>
  <div class='bug-details container'>
    <div class="row justify-content-center">
      <div class="card" style="width: 30rem;">
        <div class="card-body">
          <h5 class="card-title">{{bug.title}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Last Update: {{new Date(bug.createdAt).toLocaleDateString()}}</h6>
          <p class="card-text">{{bug.description}}
          </p>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Add Comment
          </button>
          &nbsp;
          <button class=" btn btn-success card-link" @click="sendCloseBug(bug._id)">Mark Resolved</button>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Comment</h5>
                <button type="submit" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <textarea rows="4" cols="50" placeholder="Enter Comments"></textarea>


                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import CreateBug from "@/components/CreateBug.vue"
  import Bugs from '@/components/Bugs.vue'
  import { setTimeout } from 'timers'


  export default {
    name: 'BugDetails',
    mounted() {
      this.$store.dispatch('getBug', this.$route.params.id);
      setTimeout(() => {
        if (!this.bug._id) {
          this.$router.push({ name: "home" })
        }
      }, 3000)
    },
    computed: {
      bug() {
        return this.$store.state.bug;
      },
    },
    methods: {
      sendCloseBug(id) {
        return this.$store.dispatch('closeBug', id)
      }
    },
    components: {
      CreateBug,
      Bugs,
    }
  }


</script>