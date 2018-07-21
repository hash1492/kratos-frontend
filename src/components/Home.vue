<template>
  <div>
    <div class="home-component container">
      <h1>Home</h1>
      <create-post></create-post>
      <div class="user-feed">
        <user-post v-for="post in posts" v-bind:key="post.id" :post="post"></user-post>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'
  import CreatePost from './../components/CreatePost.vue'
  import UserPost from './../components/UserPost.vue'

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
    components: {
      CreatePost,
      UserPost
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
      max-width: 700px;
    }
</style>
