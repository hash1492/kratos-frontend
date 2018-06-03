<template>
    <div class="create-post">
        <div class="form-group">
            <textarea class="form-control status-input" rows="3" col="10" placeholder="Say something..." v-model="status"></textarea>
        </div>
        <button type="button" class="btn btn-info" v-on:click="addPost()">Post</button>
    </div>
</template>
<script>
import Api from './../services/api/api.service'

export default {
    data() {
        return {
            status: ''
        }
    },
    methods: {
        addPost: function() {
            console.log("addpost called");
            console.log(this.status);
            let post = {
                message: this.status,
                type: 'status'
            };

            Api.post('/posts', post)
            .then(response => {
                console.log(response);
                this.status = '';
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style>

</style>
