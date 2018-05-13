<template>
  <div>
    <div class="forgot-password-component">
      <h1>Forgot Password</h1>
      <form class="form-forgot-password">
        <div v-if="!showVerificationForm">
          <div class="form-group">
            <label>Email address</label>
            <input class="form-control" type="email" v-model="user.email" placeholder="Email">
          </div>
          <button type="button" class="btn btn-info" v-on:click="sendEmail()">Send Email</button>
          <br><br>
          <div>
            <router-link to="/login">Remember your password? Login</router-link>
          </div>
        </div>

        <div v-else>
          <div class="form-group">
            <label>Verification code</label>
            <input class="form-control" type="text" v-model="user.verificationCode" placeholder="Verification code">
          </div>
          
          <div class="form-group">
            <button type="button" class="btn btn-info" v-on:click="verifyUser()">Verify</button>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-primary" :disabled="disableSendEmail" v-on:click="sendEmail()">Resend code</button>
          </div>
          <hr>
          <div v-if="disableSendEmail">
            Wait for {{remainingSeconds}} seconds before resending
          </div>

        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">

import Api from './../services/api/api.service'

export default {
  name: "ForgotPassword",
  data() {
    return {
      user: {
        email: "",
        verificationCode: ""
      },
      showVerificationForm: false,
      disableSendEmail: false,
      remainingSeconds: 10
    };
  },
  methods: {
    sendEmail: function() {
      var self = this;

      let user = {
        email: this.user.email
      }
      Api.post('/forgot-password', user)
      .then(response => {
        console.log(response);
              
        self.remainingSeconds = 10;
        self.disableSendEmail = true;
        var secondsInterval = setInterval(function(){
          if(self.remainingSeconds > 0) {          
            self.remainingSeconds = self.remainingSeconds - 1;
          }
        }, 1000);
        setTimeout(function(){
          self.disableSendEmail = false;
          self.remainingSeconds = 10;
          clearInterval(secondsInterval);
        }, 10000)

        if (!self.user.email) {
          return 0;
        }
        self.showVerificationForm = true;
      })
      .catch(err => {
        console.log(err);
      })
    },
    verifyUser: function() {
      if (!this.user.verificationCode) {
        return 0;
      }

      let user = {
        email :this.user.email,
        verificationCode: this.user.verificationCode
      };

      Api.post('/verify-user', user)
      .then(response => {
        console.log(response);
        this.$router.push({name: 'ResetPassword'});
      })
      .catch(err => {
        console.log(err);
      })

    }
  }
};
</script>
<style>
.forgot-password-component {
  margin-top: 50px;
}

.form-forgot-password {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
