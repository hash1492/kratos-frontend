<template>
  <div class="my-profile-component container">
      <h1>My Profile</h1>
      <!-- <create-post></create-post> -->
  </div>
</template>
<script>
  import Api from './../services/api/api.service'
  import CreatePost from './../components/CreatePost.vue'
  
  export default {
    components: {
      CreatePost
    },
    created: function() {
        Api.get('/posts/timeline')
        .then(response => {
          console.log(response);
          this.posts = response.data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>
<style>
.my-profile-component {
  margin-top: 50px;
  max-width: 700px;
}
</style>

