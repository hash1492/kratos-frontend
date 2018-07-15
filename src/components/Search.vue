<template>
  <div>
    <div class="search-component container">
        <h1>Search</h1>
        <div class="form-group">
            <label>Search</label>
            <input class="form-control" type="email" v-on:keyup.enter="search()" v-model="searchInput.text" placeholder="Type a name...">
        </div>
        <button type="button" class="btn btn-info" v-on:click="search()">Search</button>
        <div v-if="showSearchResults">
          <div class="search-results" v-if="users.length">
            <search-result v-for="user in users" :user="user" v-bind:key="user.id"></search-result>
          </div>

          <div class="empty-search-results" v-if="searchInput.text && !users.length ">
            No users found
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  import Api from './../services/api/api.service'
  import SearchResult from './../components/SearchResult.vue'

  export default {
    name: 'Search',
    components: {
        SearchResult
    },
    data () {
      return {
        searchInput: {
          text: ''
        },
        users: [],
        showSearchResults: false
      }
    },
    methods: {
      search: function () {
        console.log("search called");
          
        if (!this.searchInput.text) {
          this.$toasted.error('Search input is missing');
          return 0
        }

        Api.post('/users/search', this.searchInput)
        .then(response => {
          console.log(response);
          this.showSearchResults = true;
          this.users = response.data;
        })
        .catch(err => {
          console.log(err.response);
          if(err.response.data.errorCode === "NO_USERS_FOUND") {
            this.users = [];
          }
        })
      }
    }
  }
</script>
<style>
    .search-component {
      margin-top: 50px;
      max-width: 700px;
    }

    .search-results {
        border: 1px solid #eee;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 20px;
        text-align: left;
        margin: 20px 0;
    }

    .empty-search-results {
      border: 1px solid #eee;
      margin-top: 20px;
      padding: 15px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
</style>
