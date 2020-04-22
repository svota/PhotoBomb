<template>
  <div class="photo">
    <SingleImage :photos="photo" />
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import SingleImage from '@/components/SingleImage.vue';
export default {
  name: 'Photo',
  components: {
    SingleImage,
  },
  data() {
    return {
      photo: [],
      error: '',
    }
  },
  created() {
    this.getPhoto();
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>

</style>
