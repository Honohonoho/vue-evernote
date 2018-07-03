<template>
    <el-container id="notebook-list" class="main-page-container">
        <el-header class="header">
            <el-button type="primary" class="button" @click="createNoteBook"><i class="el-icon-plus"></i> 新建笔记本</el-button>
        </el-header>
        <el-main class="main">
            <p class="list-title">笔记本列表({{total}})</p>
            <div class="list">
                <el-table :data="tableData" border style="width: 100%" row-class-name="table-row">
                    <el-table-column prop="title" label="标题">
                        <template slot-scope="scope">
                            <router-link class="table-link" :to="{ name: 'note', params: {notebook_id: scope.row.id} }">
                                <span>
                                    <i class="fa fa-book"></i>
                                    {{scope.row.title}}
                                </span>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_date_name" label="创建时间" width="150"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="editNoteBookTitle(scope.row)">重命名</el-button>
                            <el-button size="mini" type="danger" @click="deleteNoteBook(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <!-- 弹窗 -->
    </el-container>
</template>

<script>
import User from '@/servers/user'
import NoteBooksListService from '@/servers/noteBooksListService'

export default {
    data() {
        return {
            tableData: [
                {title: '笔记本1', id: 1, time: '2018-01-01'},
                {title: '笔记本2', id: 2, time: '2018-02-02'}
            ],
            total: '',
            centerDialogVisible: false
        }
    },
    created() {
        User.getUserInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({path: '/login'})
            }
        })
        this.loadData()
    },
    methods: {
        // 刷新列表
        loadData() {
            NoteBooksListService.get().then(res => {
                this.tableData = res.data
                this.total = res.data.length
            })
        },
        // 创建
        createNoteBook() {
            this.$prompt('', '请输入笔记本标题', {
                confirmButtonText: '创建',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                NoteBooksListService.create({title: value}).then(res => {
                    this.$message({
                        message: '创建成功，请在下方列表查看~',
                        type: 'success'
                    })
                    this.loadData()
                }).catch((res) => {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                })
            }).catch(() => {     
            })
        },
        // 重命名标题
        editNoteBookTitle(row) {
            this.$prompt('', '请输入新笔记本标题', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: row.title,
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                NoteBooksListService.update({id: row.id, title: value}).then(res => {
                    this.$message({
                        message: '修改成功~',
                        type: 'success'
                    })
                    this.loadData()
                }).catch((res) => {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                })
            }).catch(() => {     
            })
        },
        // 删除笔记本
        deleteNoteBook(id) {
            this.$confirm('此操作将永久删除该文件, 手滑了吗?', '删除笔记本', {
                confirmButtonText: '我要删除',
                cancelButtonText: '手滑了',
                type: 'warning'
            }).then(() => {
                NoteBooksListService.delete({id: id}).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.loadData()
                }).catch((res) => {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                })
            }).catch(() => {     
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/style/common";
#notebook-list {
    .header {
        .button {
            height: 40px;
        }
    }
    .main {
        .list-title {
            max-width: 1000px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 12px;
            font-weight: bold;
        }
    }
    .list {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        .table-link {
            width: 100%;
            display: inline-block;
            color: #909399;
            .fa {
                color: #909399;
            }
        }
        .table-row:hover {
            .table-link {
                color: #409EFF;
                .fa {
                    color: #409EFF;
                }
            }
        }
    }
}
</style>