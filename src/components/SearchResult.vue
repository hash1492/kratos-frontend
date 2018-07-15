<template>
    <div class="search-result">
        <div class="user-details">
            <img src="./../assets/avatar.png" class="user-avatar" alt="">
            <span class="user-name">{{user.firstName}} {{user.lastName}}</span>    
            <span class="user-email">({{user.email}})</span>
        </div>
        <div v-if="!user.isMyProfile">
            <button type="button" class="btn btn-info" v-on:click="addFriend()" v-if="!requestSent && !user.isFriend">Add</button>
            <div class="request-sent" v-if="requestSent">
                <span class="fa fa-check"></span>Request Sent
            </div>
            <div class="friendship-status"  v-if="user.isFriend">
                <span class="fa fa-user-friends"></span>Friend
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'

  export default {
    name: 'SearchResult',
    props: ['user'],
    data () {
      return {
          requestSent: false
      }
    },
    methods: {
      addFriend: function () {
        console.log("addFriend called");
        let friendRequestObj = {
            userId: this.user.id
        };
        Api.post('/friendRequests', friendRequestObj)
        .then(response => {
            console.log(response);
            this.requestSent = true;
           this.$toasted.show('Friend request sent');
        })
        .catch(err => {
            console.log(err);
        })
      }
    }
  }
</script>
<style>
    .search-result {
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 15px;
        justify-content: space-between;
    }

    .search-result img {
        border-radius: 50%;
        width: 60px;
        margin-right: 15px;
    }

    .request-sent {
        display: inline-block;
    }

    .request-sent .fa-check{
        margin-right: 10px;
        color: green;
    }

    .user-email {
        margin-left: 20px;
        color: lightslategrey;
    }

    .friendship-status .fa-user-friends {
        margin-right: 10px;
        color: blue;
    }
</style>
