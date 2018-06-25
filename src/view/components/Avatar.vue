<template>
    <div>
        <router-link to="/login">
            <span :title="username">{{slug}}</span>
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
        Bus.$on('catchUserInfo', data => {
            this.username = data.username
        })
        User.getUserInfo().then(res => {
            console.log(res)
            if (res.isLogin) {
                this.username = res.data.username
            }
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
span {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 15px;
}
</style>