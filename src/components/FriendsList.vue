<template>
  <div class="friends-list-component container">
      <h1>Friends List</h1>
      <div class="friends-list">
        <div class="friend-item" v-for="friend in friends" v-bind:key="friend.id">
            <div class="user-details">
              <img src="./../assets/avatar.png" class="user-avatar" alt="">
              <span class="user-name">{{friend.user.firstName}} {{friend.user.lastName}}</span>
            </div>
            <button type="button" class="btn btn-info" v-on:click="unfriend(friend)">Unfriend</button>
        </div>
        <div v-if="!friends.length">
          You have no friends :(
        </div>
      </div>
  </div>
</template>
<script>
import Api from './../services/api/api.service'

export default {
  beforeCreate: function () {
    let self = this;
    Api.get('/friends/my')
    .then(function (response) {
      console.log(response);
      self.friends = response.data;
    })
    .catch(function (err) {
      console.log(err);
    })
  },
  data() {
    return {
      friends: []
    }
  },
  methods: {
    unfriend: function (friend) {
      console.log(friend);
      let self = this;
      Api.post('/friends/unfriend', friend)
      .then(function (response) {
        console.log(response);
        self.friends = self.friends.filter(function(friendObj) {
          friendObj.id !== friend.id;
        })
        self.$toasted.success('Unfriended ' + friend.user.firstName);
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>
<style>
.friends-list-component {
    margin-top: 50px;
    max-width: 700px;
}

.friends-list {
    border: 1px solid #eee;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: left;
    margin: 20px 0;
}

.friend-item {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
}

.friend-item img {
    border-radius: 50%;
    width: 60px;
    margin-right: 15px;
}
</style>

