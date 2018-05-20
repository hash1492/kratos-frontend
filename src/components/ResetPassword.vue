<template>
  <div>
    <div class="reset-password-component">
      <h1>Reset Password</h1>
      <form class="form-reset-password">
        <div class="form-group">
          <label>New password</label>
          <input class="form-control" type="password" v-model="user.password" placeholder="Password">
        </div>
        <div class="form-group">
          <label>Confirm password</label>
          <input class="form-control" type="password" v-model="user.confirmPassword" placeholder="Confirm Password">
        </div>
        <button type="button" class="btn btn-info" v-on:click="resetPassword()">Reset Password</button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'

  export default {
    name: 'ResetPassword',
    data () {
      return {
        user: {
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      resetPassword: function () {
        if (!this.user.password || !this.user.confirmPassword) {
          this.$toasted.error('Password or Confirm password fields incomplete');
          return 0;
        }

        if(this.user.password !== this.user.confirmPassword) {
          this.$toasted.error('Password and Confirm password fields must match');
          return 0;
        }        
        this.user.id = this.$route.params.userId;

        Api.post('/reset-password', this.user)
        .then(response => {
          this.$toasted.show('Password reset successful!');
          console.log(response);
          this.$router.push({name: 'Login'});
        })
        .catch(err => {
          console.log(err.response.data);
          const errorCode = err.response.data.errorCode;
          switch(errorCode) {
            case 'USER_DOESNT_EXIST': 
              this.$toasted.error('User with this email doesn\'t exist');
              break;
          }
        })
      }
    }
  }
</script>
<style>
.reset-password-component {
  margin-top: 50px;
}

.form-reset-password {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
</style>
