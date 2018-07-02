<template>
    <div id="notebook-detail" class="main-page-container">
        <div class="left-container">
            <div class="header">
                <el-dropdown class="dropdown" @command="dropMenuChange">
                    <span class="el-dropdown-link">
                        {{curNoteBook.title}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item" v-for="item in NoteBooksListData" :key="item.id">{{item.title}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button size="mini" round type="primary" class="add-note" @click="addNote"><i class="el-icon-edit"></i> 添加笔记</el-button>
            </div>
            <div class="main">
                <div class="list">
                    <el-table class="table" :data="tableData" style="width: 100%" @row-click="onNoteClick" row-class-name="table-row" header-row-class-name="table-header">
                        <el-table-column prop="create_date_name" label="更新时间" width="100"></el-table-column>
                        <el-table-column prop="title" label="标题">
                            <template slot-scope="scope">
                                <router-link class="table-link" :to="{ path: `/note/${noteBookId}`, query: { note_id: scope.row.id } }">
                                    <span>
                                        {{scope.row.title}}
                                    </span>
                                </router-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="right-container">
            <!-- <NoteContent v-bind:noteData="curNote" v-on:noteTitleChange="handleNoteTitleChange"></NoteContent> -->
            <div class="header">
                <div class="info">
                    <span class="create-time">创建日期：{{curNote.create_date_name}}</span>
                    <span class="update-time">更新日期：{{curNote.update_date_name}}</span>
                    <span class="status" v-if="isEditing && !isNoteUpdating">状态：<el-tag >正在输入</el-tag></span>
                    <span class="status" v-if="isNoteUpdating">状态：<el-tag type="info">保存中</el-tag></span>
                    <span class="status" v-if="!isEditing && !isNoteUpdating">状态：<el-tag type="success">以保存</el-tag></span>
                </div>
                <div class="buttons">
                    <span>预览</span>
                    <span>删除</span>
                </div>
            </div>
            <div class="main">
                <div class="note-title">
                    <input type="text" placeholder="请输入标题" v-model="curNote.title" @focus="onEditStatusChange" @input="onNoteTitleChange">
                </div>
                <div class="note-content">
                    <textarea  placeholder="写点什么吧~ 支持Markdown语法" v-model="curNote.content" @input="onNoteContentChange" @focus="onEditStatusChange"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '@/servers/user'
// import NoteContent from './components/NoteContent.vue'
import NoteBooksListService from '@/servers/noteBooksListService'
import NoteBookDetailService from '@/servers/noteBookDetailService'

export default {
    // components: {
    //     NoteContent
    // },
    data() {
        return {
            msg: "笔记详情页",
            noteBookId: '',
            NoteBooksListData: [],
            curNoteBook: {},
            curNote: {},
            isEditing: false,
            isNoteUpdating: false,
            timeId: '',
            tableData: [
                {time: '刚刚', title: '123'},
                {time: '刚刚', title: '笔记'},
                {time: '2018-05-12', title: 'fdgfdg'},
                {time: '刚刚', title: '123'},
                {time: '刚刚', title: '321'},
                {time: '刚刚', title: '123'},
            ]
        };
    },
    watch: {
        '$route': function(val) {
            // console.log(val)
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.noteBookId = to.params.notebook_id
        this.loadNoteBooksList()
        next()
    },
    created() {
        User.getUserInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({path: '/login'})
            }
        })
        if (this.$route.params.notebook_id !== '') {
            this.noteBookId = this.$route.params.notebook_id
        }
        this.loadNoteBooksList()
    },
    methods: {
        loadNoteBooksList() {
            NoteBooksListService.get().then(res => {
                this.NoteBooksListData = res.data
                if (this.noteBookId !== '') {
                    res.data.forEach(item => {
                        if (item.id == this.noteBookId) {
                            this.curNoteBook = item
                        }
                    })
                }
                else {
                    this.$route.params.notebook_id = res.data[0].id
                    this.noteBookId = res.data[0].id
                    this.curNoteBook = res.data[0]
                }
                this.loadNoteData()
            })
        },
        loadNoteData() {
            NoteBookDetailService.get({noteBookId: this.noteBookId}).then(res => {
                this.tableData = res.data
            })
        },
        addNote() {
            NoteBookDetailService.create().then(res => {
                console.log(res)
                this.tableData = res.data
            })
        },
        // 下拉菜单点击
        dropMenuChange(item) {
            this.$router.push({name: 'note', params: {notebook_id: item.id}})
            this.curNoteBook = item
            this.noteBookId = item.id
            this.loadNoteData()
        },
        // 每个笔记点击时
        onNoteClick(row, event, column) {
            console.log(row)
            this.curNote = row
        },
        // 笔记内容修改
        onNoteContentChange(val) {
            let _this = this
            this.curNote.content = val.target.value
            this.isEditing = true
            //节流
            clearTimeout(this.timeId)
            this.timeId = setTimeout(function () {
                _this.isNoteUpdating = true
                NoteBookDetailService.update({noteId: _this.curNote.id}, {title: _this.curNote.title, content: _this.curNote.content}).then(res => {
                    console.log(res)
                    _this.isNoteUpdating = false
                    _this.isEditing = false
                }).catch(res => {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                })
            }, 1000)
        },
        // 笔记标题修改
        onNoteTitleChange(val) {
            let _this = this
            this.curNote.title = val.target.value
            this.isEditing = true
            //节流
            clearTimeout(this.timeId)
            this.timeId = setTimeout(function () {
                _this.isNoteUpdating = true
                NoteBookDetailService.update({noteId: _this.curNote.id}, {title: _this.curNote.title, content: _this.curNote.content}).then(res => {
                    console.log(res)
                    _this.isNoteUpdating = false
                    _this.isEditing = false
                }).catch(res => {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                })
            }, 1000)
        },
        // 笔记状态修改
        onEditStatusChange() {
            this.isEditing = true
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/style/common";
#notebook-detail {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .left-container {
        width: 450px;
        height: 100%;
        background: #e9eef3;
        .header {
            padding: 0 10px;
            height: 60px;
            background: #b3c0d1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .add-note {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            .dropdown {
                .el-dropdown-link {
                    display: inline-block;
                    color: #222;
                    max-width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .main {
            background: #e9eef3;
            .table {
                .el-table__header-wrapper {
                    font-size: 14px;
                    border-bottom: 1px solid #DCDFE6;
                    .table-header {
                        background: #e9eef3;
                        th:first-child .cell {
                            border-right: 1px solid #DCDFE6;
                        }
                        .cell {
                            color: #222;
                            font-weight: normal;
                            background: #e9eef3;
                        }
                        th {
                            padding: 0;
                        }
                    }
                }
                .table-link {
                    display: inline-block;
                    width: 100%;
                }
            }
            .table tr{
                background: #e9eef3;
            }
        }
    }
    .right-container {
        flex-grow: 1;
        min-width: 480px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .header {
            width: 100%;
            height: 60px;
            padding: 0 20px;
            color: #606266;
            .info {
                .create-time {
                    display: inline-block;
                    width: 150px;
                }
                .update-time {
                    display: inline-block;
                    width: 150px;
                    margin-left: 10px;
                }
                .status {
                    margin-left: 10px;
                }
            }
            .buttons {
                margin-left: auto;
            }
        }
        .main {
            width: 100%;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
        .note-title {
            width: 100%;
            height: 54px;
            padding: 0 20px;
            input {
                width: 100%;
                border: none;
                background: #F2F6FC;
                -web-kit-appearance: none;
                -moz-appearance: none;
                outline: 0;
                height: 54px;
                padding: 10px 0;
                line-height: 54px;
                font-size: 24px;
                color: #606266;
                font-family: "Microsoft YaHei","微软雅黑",Arial,sans-serif;
            }
            input::-webkit-input-placeholder {
                font-size: 24px;
                font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
            }
        }
        .note-content {
            width: 100%;
            flex-grow: 1;
            padding: 0 20px;
            padding-bottom: 20px;
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
            textarea {
                width: 100%;
                overflow-y: auto;
                padding: 6px 0;
                border: none;
                resize: none;
                -web-kit-appearance: none;
                -moz-appearance: none;
                outline: 0;
                background: #F2F6FC;
                color: #909399;
                font-size: 16px;
                line-height: 1.5;
                font-family: "Microsoft YaHei","微软雅黑",Arial,sans-serif;
            }
            textarea::-webkit-input-placeholder {
                color: #909399;
                font-size: 16px;
                font-family: "Microsoft YaHei","微软雅黑",Arial,sans-serif;
            }
        }
    }
}
</style>