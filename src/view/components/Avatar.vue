<template>
    <div class="avatar">
        <router-link to="/login">
            <span :title="username" class="slug">{{slug}}</span>
            <span class="name">{{username}}</span>
        </router-link>
    </div>
</template>

<script>
import User from '@/servers/user'
import Bus from '@/utils/bus'

export default {
    data() {
        return {
            username: "未登录"
        };
    },
    created() {
        User.getUserInfo().then(res => {
            console.log(res)
            if (res.isLogin) {
                this.username = res.data.username
            }
            else {
                this.$router.push({path: '/login'})
            }
        })
        Bus.$on('catchUserInfo', data => {
            this.username = data.username
        })
    },
    computed: {
        slug() {
            return this.username.charAt(0)
        }
    }
};
</script>

<style lang="scss" scoped>
.avatar {
    margin-top: 10px;
}
.avatar a{
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .slug {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        background: #f2b81c;
        color: #fff;
        text-shadow: 1px 0 1px #795c19;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 18px;
    }
    .name {
        margin-top: 5px;
        color: #fff;
    }
}
</style>