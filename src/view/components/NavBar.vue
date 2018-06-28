<template>
    <div id="sidebar">
        <!-- <Avatar></Avatar> -->
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >   
            <Avatar></Avatar>
            <el-menu-item index="1">
                <i class="iconfont icon-note"></i>
                <span>笔记本详情</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="iconfont icon-notebook"></i>
                <span slot="title">笔记本列表</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="iconfont icon-trash"></i>
                <span slot="title">废纸篓</span>
            </el-menu-item>
            <div class="logout" @click="onLogout">
                <i class="iconfont icon-logout"></i>
                <span>注销</span>
            </div>
        </el-menu>
    </div>
</template>

<script>
import Avatar from '@/view/components/Avatar.vue'
import User from '@/servers/user' 
export default {
    components: {
        Avatar
    },
    data() {
        return {
        }
    },
    methods: {
        onLogout() {
            User.logout().then(res => {
                console.log(res)
            })
        }
    }
};
</script>

<style lang="scss" scoped>
#sidebar {
    height: 100%;
    .el-menu {
        height: 100%;
        .el-menu-item .iconfont {
            color: inherit;
        }
    }
    .icons {
        margin-top: 15px;
        a {
            padding: 6px 0;
            display: block;
        }
        .router-link-active {
            background-color: #5e6266;
        }
    }
    .logout {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        cursor: pointer;
        .iconfont {
            color: #F56C6C;
        }
        span {
            color: #F56C6C;
        }
    }
}
</style>