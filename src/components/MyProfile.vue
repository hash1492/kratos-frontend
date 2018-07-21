<template>
  <div class="my-profile-component container">
      <h1>My Profile</h1>
      <create-post></create-post>
      <user-post v-for="post in posts" v-bind:key="post.id" :post="post"></user-post>
  </div>
</template>
<script>
  import Api from './../services/api/api.service'
  import CreatePost from './../components/CreatePost.vue'
  import UserPost from './../components/UserPost.vue'
  
  export default {
    components: {
      CreatePost,
      UserPost
    },
    data() {
      return {
        posts: []
      }
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

