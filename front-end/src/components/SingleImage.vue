<template>
<div>
  <section class="single-image">
    <div class="image" v-for="photo in photos" v-bind:key="photo._id">
      <img :src="photo.path" />
      <div class="photoInfo">
        <p class="photoTitle">{{photo.title}}</p>
        <p class="photoDescription">{{photo.description}}</p>
        <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
      </div>
      <p class="photoDate">{{formatDate(photo.created)}}</p>
    </div>
  </section>
  <Comments />
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import Comments from './Comments.vue';

export default {
  name: 'SingleImage',
  components: {
    Comments
  },
  props: {
    photos: Array
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.image img {
  width: 100%;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.photoInfo p {
  margin: 10px;
}

.photoTitle {
  font-size: 2em;
}

.photoDescription {
  font-size: 1.5em
}

.photoName {
  font-size: 1em
}

</style>
