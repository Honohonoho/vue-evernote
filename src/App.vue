<template>
    <div id="app">
        <ul>
            <li>
                <router-link to="/login">登录页</router-link>
            </li>
            <li>
                <router-link to="/notebookslist">笔记本列表页</router-link>
            </li>
            <li>
                <router-link to="/trash/2">回收站</router-link>
            </li>
        </ul>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
