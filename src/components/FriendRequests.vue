<template>
  <div class="friend-requests-component container">
      <h1>Friend Requests</h1>

      <div class="friend-requests">
        <div class="friend-request" v-for="request in friendRequests" v-bind:key="request.id">
            <div class="user-details">
                <img src="./../assets/avatar.png" class="user-avatar" alt="">
                <span class="user-name">{{request.user.firstName}} {{request.user.lastName}}</span>
            </div>

            <div class="request-actions" v-if="!request.requestHandled">
                <button type="button" class="btn btn-info" v-on:click="acceptRequest(request)">Accept</button>
                <button type="button" class="btn btn-info" v-on:click="declineRequest(request)">Decline</button>
            </div>
            <div v-if="request.requestHandled">
                <div v-if="request.requestAccepted">
                    <span class="fa fa-check"></span>Request Accepted
                </div>
                <div v-if="request.requestDeclined">
                    <span class="fa fa-times"></span>Request Declined
                </div>
            </div>
        </div>
        <div v-if="!friendRequests.length">
            No Friend Requests
        </div>
      </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'

  export default {
    name: 'FriendRequests',
    created() {
        Api.get('/friendrequests')
        .then(response => {
          console.log(response);
          this.friendRequests = response.data;
        })
        .catch(err => {
          console.log(err);
        })
    },
    data () {
      return {
        friendRequests: []
      }
    },
    methods: {
      acceptRequest: function (request) {
        console.log("acceptRequest called");
        console.log(request);
        Api.post('/friendrequests/accept', {friendrequestId: request.id})
        .then(response => {
            console.log(response);
            Api.post('/friends', {userId1: request.user.id})
            .then(response => {
                console.log(response);
                request.requestHandled = true;
                request.requestAccepted = true;
                this.$toasted.show('Friend request accepted');
                this.$forceUpdate();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
      },
      declineRequest: function (request) {
        console.log("declineRequest called");
        console.log(request);
        Api.post('/friendrequests/decline', {friendrequestId: request.id})
        .then(response => {
            console.log(response);
            Api.post('/friends', {userId1: request.user.id})
            .then(response => {
                console.log(response);
                request.requestHandled = true;
                request.requestDeclined = true;
                this.$toasted.show('Friend request declined');
                this.$forceUpdate();
            })
            .catch(err => {
                console.log(err);
            })
            
        })
        .catch(err => {
            console.log(err);
        })
      }
    }
  }
</script>
<style>
.friend-requests-component {
    margin-top: 50px;
    max-width: 700px;
}

.friend-requests {
    border: 1px solid #eee;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: left;
    margin: 20px 0;
}

.friend-request {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
}

.request-actions button{
    margin-left: 10px;
}

.friend-request img {
    border-radius: 50%;
    width: 60px;
    margin-right: 15px;
}

.friend-request .fa-check,
.friend-request .fa-times {
    margin-right: 10px;
    color: green;
}
    
</style>
