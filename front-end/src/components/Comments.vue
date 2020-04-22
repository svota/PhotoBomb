<template>
<div>
  <div class="comment-form" v-if="user">
    <form class="pure-form" @submit.prevent="post">
      <legend>Post a comment</legend>
      <fieldset>
        <textarea v-model="text" placeholder="Type here"></textarea>
      </fieldset>
      <fieldset class="buttons">
        <button type="submit" class="pure-button pure-button-primary right">Post</button>
      </fieldset>
    </form>
  </div>
  <section class="comment-list">
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
      <p class="commentUser">{{comment.user.firstName}} {{comment.user.lastName}}</p>
      <p class="commentText">{{comment.comment}}</p>  
      <p class="commentDate">{{formatDate(comment.created)}}</p>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'Comments',
  data() {
    return {
      comments: [],
      text: '',
      error: '',
      id: this.$route.params.id
    }
  },
  created() {
    this.getComments();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getComments() {
      try {
        this.response = await axios.get("/api/comments/" + this.id);
        this.comments = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async post() {
      let id = this.$route.params.id;
      try {
        const formData = new FormData();
        formData.append('comment', this.text);
        await axios.post("/api/comments/" + id, formData);
        this.text = '';
        this.getComments();
      } catch (error) {
        console.log(error);
        this.error = "Error: " + error.response;
      }
    }
  }
}
</script>
