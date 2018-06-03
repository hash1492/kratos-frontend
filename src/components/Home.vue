<template>
  <div>
    <div class="home-component container">
      <h1>Home</h1>
      <!-- Add post input section -->
      <!-- <div class="user-status">
        <div class="form-group">
          <textarea class="form-control status-input" rows="3" col="10" placeholder="Say something..." v-model="status"></textarea>
        </div>
        <button type="button" class="btn btn-info" v-on:click="addPost()">Post</button>
      </div> -->
      <create-post></create-post>
      <div class="user-feed">
        <user-post></user-post>
        <div class="user-post">
          <div class="user-details">
              <img src="./../assets/avatar.png" class="user-avatar" alt="">
              <span class="user-name">Kartik Joshi</span>
          </div>

          <div class="post-content">
              <p class="post-text">I want to buy a GoPro</p>
              <!-- <img src="./../assets/post-img.jpg" class="post-image" alt=""> -->
          </div>

          <div class="post-actions">
              <ul class="post-actions-list">
                  <li class="post-action">
                      <i class="fas fa-thumbs-up"></i>Like
                  </li>
                  <li class="post-action">
                      <i class="fas fa-comment-alt"></i>Comment
                  </li>
                  <li class="post-action">
                      <i class="fas fa-share"></i>Share
                  </li>
              </ul>
          </div>
    </div>
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
