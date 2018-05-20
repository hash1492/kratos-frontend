<template>
  <div>
    <div class="register-component">
      <h1>Register</h1>
      <form class="form-register">
        <div class="form-group">
          <label>First name</label>
          <input type="text" class="form-control" v-model="user.firstName" placeholder="Jason">
        </div>
        <div class="form-group">
          <label>Last name</label>
          <input type="text" class="form-control" v-model="user.lastName" placeholder="Bourne">
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" v-model="user.email" placeholder="jason.bourne@gmail.com">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="user.password" placeholder="******">
        </div>
        <div class="form-group">
          <label>Confirm password</label>
          <input type="password" class="form-control" v-model="user.confirmPassword" placeholder="******">
        </div>
        <button type="button" class="btn btn-info" v-on:keyup.enter="register" v-on:click="register()">Register</button>
        <br><br>
        <div>
          <router-link to="/login">Existing user? Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'

  export default {
    name: 'Register',
    data () {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      register: function () {
        if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password) {
          this.$toasted.error('Form is incomplete');
          return 0
        }
        if (this.user.password !== this.user.confirmPassword) {
          this.$toasted.error('Passwords must match');
          return 0
        }
        
        Api.post('/register', this.user)
        .then(response => {
          console.log(response);
          this.$toasted.show('Registration successful');
          this.$router.push({ name: 'Login'});
        })
        .catch(err => {
          console.log(err.response.data);
          const errorCode = err.response.data.errorCode;
          switch(errorCode) {
            case 'EXISTING_USER': 
              this.$toasted.error('User with this email already exists');
              break;
            case 'REGISTRATION_FAILED': 
              this.$toasted.error('Registration failed');
              break;
          }
        })
      }
    }
  }
</script>
<style>
.register-component {
  margin-top: 50px;
}

.form-register {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
