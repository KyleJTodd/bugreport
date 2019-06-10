<template>


  <div class='bug-details container'>
    <div class="row justify-content-center">
      <h3>
        <router-link :to="{ name: 'home', params:'/'}">Back to List</router-link>
      </h3>
      <div class="card" style="width: 40rem;">
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
                <h5 class="modal-title" id="exampleModalLabel" v-show="bug.closed">Add Comment</h5>
                <button type="submit" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="handleSubmit ">
                  <input type="text" placeholder="User Name" v-model="creator">
                  <textarea rows="4" cols="50" placeholder="Enter Comments" v-model="content"></textarea>



                  <button type="submit" class="btn btn-primary">Submit Note</button>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-for="note in notes" :key="note._id">
      <div class="card-body">
        <h5 class="card-title">{{note.creator}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Date: {{new Date(note.updatedAt).toLocaleDateString()}}</h6>
        <p class="card-text">{{note.content}}</p>
        <a class="card-link">Edit</a>
        <a class="card-link">Delete</a>
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
    props: ['id'],
    data() {
      return {
        creator: '',
        content: '',

      }
    },
    mounted() {
      this.$store.dispatch('getBug', this.$route.params.id);
      this.$store.dispatch('getNotes', this.id);
    },
    computed: {
      bug() {
        return this.$store.state.bug;
      },
      notes() {
        return this.$store.state.notes;
      }
    },
    methods: {
      sendCloseBug(id) {
        return this.$store.dispatch('closeBug', id)
      },
      handleSubmit() {
        let data = {
          creator: this.creator,
          content: this.content,
          bug: this.id

        }
        this.$store.dispatch('createNote', data)
      },
      closeModal() {

      }
    },

    components: {
      CreateBug,
      Bugs,
    }
  }


</script>