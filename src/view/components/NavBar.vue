<template>
    <div id="sidebar">
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="routeName"
        >   
            <Avatar></Avatar>
            <el-menu-item index="note">
                <router-link class="link" :to="{name: 'note', params: {notebook_id: defaultNoteBookId}}">
                    <i class="iconfont icon-note"></i>
                    <span>笔记本详情</span>
                </router-link>
            </el-menu-item>
            <el-menu-item index="notebookslist">
                <router-link class="link" :to="{path: '/notebookslist'}">
                    <i class="iconfont icon-notebook"></i>
                    <span>笔记本列表</span>
                </router-link>
            </el-menu-item>
            <el-menu-item index="trash">
                <router-link class="link" :to="{path: '/trash'}">
                    <i class="iconfont icon-trash"></i>
                    <span>废纸篓</span>
                </router-link>
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
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    components: {
        Avatar
    },
    data() {
        return {
            defaultNoteBookId: '',
            routeName: 'notebookslist'
        }
    },
    created() {
        this.checkLogin().then(() => {
            this.getNoteBookList().then(() => {
                this.defaultNoteBookId = this.noteBookList[0].id
            })
            this.routeName = this.$route.name
            this.$router.push({path: this.$route.fullPath})
        }).catch(res => {
            this.$message({
                message: '请先登录',
                type: 'error'
            })
            this.$router.push({path: '/login'})
        })
    },
    watch: {
        '$route': function(val) {
            this.routeName = val.name
        }
    },
    computed: {
        ...mapGetters([
            'noteBookList'
        ])
    },
    methods: {
        ...mapMutations([
            'setUser'
        ]),
        ...mapActions([
            'checkLogin',
            'logout',
            'getNoteBookList'
        ]),
        onLogout() {
            this.logout().then(res => {
                this.$message({
                    message: '成功退出~',
                    type: 'success'
                })
                this.setUser({user: {username: '未登录', slug: '未'}})
                this.$router.push({path: '/login'})
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
        border-right: none;
        .link {
            display: inline-block;
            width: 100%;
            color: inherit;
        }
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