<template>
    <div>
        <header class="app-header">
            <ul class="header-links navigation-links">
                <li class="header-link">
                    <div class="app-header-logo">
                        <img src="./../assets/logo.png" alt="App Logo">
                    </div>
                </li>  
                <li class="header-link d-none d-sm-block" v-if="isLoggedIn">
                    <router-link to="/home">Home</router-link>
                </li>
                <li class="header-link d-none d-sm-block" v-if="isLoggedIn">
                    <router-link to="/search">Search</router-link>
                </li>
                <li class="header-link d-none d-sm-block" v-if="isLoggedIn">
                    <router-link to="/friend-requests">Requests</router-link>
                </li>
                <li class="header-link d-none d-sm-block" v-if="isLoggedIn">
                    <router-link to="/my-friends">Friends</router-link>
                </li>
            </ul>
            <ul class="header-links navigation-links-end d-none d-sm-flex" v-if="!isLoggedIn">
                <li class="header-link">
                    <button class="btn btn-info" v-on:click="goToLogin()">Login</button>
                </li>
                <li class="header-link">
                    <button class="btn btn-success" v-on:click="goToRegister()">Register</button>
                </li>
            </ul>
            <ul class="header-links navigation-links-end d-none d-sm-flex" v-if="isLoggedIn">
                <li class="header-link">
                    <router-link to="/my-profile" class="user-name">{{currentUser.firstName}}</router-link>
                    <button class="btn btn-info" v-on:click="logout()">Logout</button>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
    import Auth from './../services/auth/auth.service'

    export default {
        data() {
            return {
                isLoggedIn: false,
                currentUser: {}
            }
        },
        created: function() {
            this.isLoggedIn = Auth.isLoggedIn();
            if(this.isLoggedIn) {
                this.currentUser = Auth.getCurrentUser();
                console.log(this.currentUser);
            }
            this.$root.$on('loginChanged', loginStatus => {
                console.log(loginStatus);
                this.isLoggedIn = loginStatus;
                if(this.isLoggedIn) {
                    this.currentUser = Auth.getCurrentUser();
                    console.log(this.currentUser);
                    
                } else {
                    Auth.removeCurrentUser();
                    this.currentUser = {};
                }
            })
        },
        methods: {
            goToLogin: function () {
                this.$router.push({ name: 'Login'});
            },
            goToRegister: function () {
                this.$router.push({ name: 'Register'});
            },
            logout: function () {
                Auth.removeAuthToken();
                this.$root.$emit('loginChanged', false);
                this.$router.push({ name: 'Login'});
            }
        }
    }
</script>

<style scoped>
    .app-header {
        align-items: center;
        background-color: black;
        height: 60px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
    }

    .navigation-links {
        display: flex;
        flex-direction: row;
    }

    .navigation-links-end {
        display: flex;
        justify-content: flex-end;
    }

    .app-header-logo {
        justify-self: center;
    }
    
    .app-header-logo img {
        width: 30px;
        justify-self: center;
    }

    .header-links {
        display: flex;
        align-items: center;
    }

    .header-link {
        list-style-type: none;
        padding: 0 10px;
    }

    .header-link a {
        color: white;
        text-decoration: none;
        font-weight: 700;
    }

    .header-link a:hover {
        color:dodgerblue;
    }

    .header-link .user-name {
        margin-right: 20px;
        color: white;
    }
</style>
