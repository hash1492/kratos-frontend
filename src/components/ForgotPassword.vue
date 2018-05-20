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
          <button type="button" class="btn btn-info" :disabled="!user.email" v-on:click="sendEmail()">Send Email</button>
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
            <button type="button" :disabled="!user.verificationCode" class="btn btn-info" v-on:click="verifyUser()">Verify</button>
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
import Storage from './../services/storage/storage.service'

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
      if(!this.user.email) {
        this.$toasted.show('Please enter an Email');
        return 0;
      }
      var self = this;

      let user = {
        email: this.user.email
      }
      Api.post('/forgot-password', user)
      .then(response => {
        console.log(response);

        this.$toasted.show('Verification code sent!');

        self.user.id = response.data.userId;
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
        console.log(err.response.data);
        const errorCode = err.response.data.errorCode;
        switch(errorCode) {
          case 'USER_DOESNT_EXIST': 
            this.$toasted.error('User with this email doesn\'t exist');
            break;
          case 'FORGOT_PASSWORD_FAILED': 
            this.$toasted.error('Forgot password failed');
            break;
        }
      })
    },
    verifyUser: function() {
      if (!this.user.verificationCode) {
        this.$toasted.show('Please enter the Verification code');
        return 0;
      }

      let user = {
        email: this.user.email,
        verificationCode: this.user.verificationCode
      };
      
      Api.post('/verify-user', user)
      .then(response => {
        console.log(response);
        this.$toasted.show('Email is verified!');
        Storage.set('forgotPasswordUser', response.data.id);
        this.$router.push({name: 'ResetPassword',  params: { userId: response.data.id }});
      })
      .catch(err => {
        console.log(err.response.data);
        const errorCode = err.response.data.errorCode;
        switch(errorCode) {
          case 'USER_DOESNT_EXIST': 
            this.$toasted.error('User with this email doesn\'t exist');
            break;
          case 'VERIFICATION_FAILED': 
            this.$toasted.error('Verification failed');
            break;
        }
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
