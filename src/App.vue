<template>
    <div id="app">
        <NavBar></NavBar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from '@/view/components/NavBar.vue'

export default {
    name: 'App',
    components: {
        NavBar
    }
}
</script>

<style>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
#app { 
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    display: flex;
    align-items: stretch;
}
div,span {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body, #app {
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    background-color: #eee;
    min-height: 700px;
    overflow-y: auto;
}

a {
    text-decoration: none;
    color: #444;
}

ul, li{
    list-style: none;
}

.btn {
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    cursor: pointer;
    display: inline-block;
}
</style>
