<template>
    <div id="note-detail">
        <h1>{{msg}}</h1>
        <p>当前为笔记本{{$route.params.note_id}}</p>
    </div>
</template>

<script>
import User from '@/servers/user'

export default {
    data() {
        return {
            msg: "笔记详情页"
        };
    },
    created() {
        User.getUserInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({path: '/login'})
            }
        })
    }
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>