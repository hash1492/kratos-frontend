<template>
    <div class="user-post">
        <div class="user-details">
            <img src="./../assets/avatar.png" class="user-avatar" alt="">
            <span class="user-name" >{{post.userId.firstName}} {{post.userId.lastName}}</span>
        </div>

        <div class="post-content">
            <p class="post-text">{{post.message}}</p>
            <img v-if="post.photo" src="post.photo" class="post-image" alt="">
        </div>
        <div class="post-likes-comments">
            <div class="post-likes-count">
                <span>{{post.likes}} likes</span>
            </div>
            <div class="post-comments-count">
                <span>0 comments</span>
            </div>
        </div>
        <div class="post-actions">
            <ul class="post-actions-list">
                <li class="post-action">
                    <i class="fas fa-thumbs-up"></i>Like
                </li>
                <li class="post-action">
                    <i class="fas fa-comment-alt"></i>Comment
                </li>
                <li class="post-action">
                    <i class="fas fa-share"></i>Share
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['post'],
        created: function() {
            console.log(this.post);
            
        }
    }
</script>
<style>
    .user-post {
        border: 1px solid #eee;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 20px;
        text-align: left;
        margin: 20px 0;
        background-color: white;
    }
    .user-details {
        font-weight: 700;
        margin-bottom: 10px;
    }
    .user-details img {
        border-radius: 50%;
        width: 60px;
        margin-right: 15px;
    }

    .post-content img{
        width: 100%;
    }

    .post-likes-comments {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        color: darkgray;
    }

    .post-actions-list {
        list-style-type:none;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .post-action {
        cursor:pointer;
        font-size: 14px;
    }
    .post-action i {
        margin-right: 10px;
    }

    .post-time {
        float: right;
    }
</style>
