<template>
  <div>
    <div class="login-component">
      <h1>Login</h1>
      <form class="form-login">
        <div class="form-group">
          <label>Email address</label>
          <input class="form-control" type="email" v-model="user.email" placeholder="Email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input class="form-control" type="password" v-model="user.password" v-on:keyup.enter="login" placeholder="Password">
        </div>
        <button type="button" class="btn btn-info" v-on:click="login()">Login</button>
        <br><br>
        <div>
          <router-link to="/forgot-password">Forgot password?</router-link>
        </div>
        <hr>
        <div>
          <router-link to="/register">New user? Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'
  import Auth from './../services/auth/auth.service'

  export default {
    name: 'Login',
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        if (!this.user.email || !this.user.password) {
          this.$toasted.error('Email or password missing');
          return 0
        }

        Api.post('/login', this.user)
        .then(response => {
          console.log(response);
          this.$toasted.show(`Welcome ${response.data.firstName}!`);
          Auth.setAuthToken(response.data.token);
          delete response.data.token;
          Auth.setCurrentUser(response.data);
          this.$root.$emit('loginChanged', true);
          this.$router.push({ name: 'Home'});
        })
        .catch(err => {
          console.log(err.response.data);
          const errorCode = err.response.data.errorCode;
          switch(errorCode) {
            case 'INCORRECT_PASSWORD': 
              this.$toasted.error('Incorrect password');
              break;
            case 'USER_DOESNT_EXIST': 
              this.$toasted.error('User doesn\'t exist');
              break;
          }
        })
  
      }
    }
  }
</script>
<style>
.login-component {
  margin-top: 50px;
}

.form-login {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
</style>
