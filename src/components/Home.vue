<template>
  <div>
    <div class="home-component container">
      <h1>Home</h1>
      <!-- Add post input section -->
      <div class="form-group">
        <textarea class="form-control status-input" rows="3" col="10" placeholder="Say something..." v-model="status"></textarea>
      </div>
      <button type="button" class="btn btn-info" v-on:click="addPost()">Post</button>
      <!-- List of posts from feed -->
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'

  export default {
    name: 'Home',
    data () {
      return {
        status,
        posts: []
      }
    },
    created() {
        this.getFeedPosts();
    },
    methods: {
      getFeedPosts: function () {        
        Api.get('/posts/feed')
        .then(response => {
          console.log(response);
          this.posts = response.data;
        })
        .catch(err => {
          console.log(err);
        })
  
      },
      addPost: function () {
        console.log("addPost called");
        console.log(this.status);
      }
    }
  }
</script>
<style>
    .home-component {
      margin-top: 50px;
    }

    /* Status */
    .status-input {
      max-width: 400px;
    }
</style>
