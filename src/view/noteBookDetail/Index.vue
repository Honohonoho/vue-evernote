<template>
    <div id="notebook-detail" class="main-page-container">
        <div class="left-container">
            <div class="header">
                <el-dropdown class="dropdown" @command="dropMenuChange">
                    <span class="el-dropdown-link">
                        {{curNoteBook.title}}
                        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                    </span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item" v-for="item in noteBookList" :key="item.id">{{item.title}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button size="mini" round type="primary" class="add-note" @click="addNote"><i class="el-icon-edit"></i> 添加笔记</el-button>
            </div>
            <div class="main">
                <div class="list">
                    <el-table class="table" :data="notesData" style="width: 100%" @row-click="onNoteClick" row-class-name="table-row" header-row-class-name="table-header">
                        <el-table-column prop="create_date_name" label="更新时间" width="100"></el-table-column>
                        <el-table-column prop="title" label="笔记标题">
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
                    <span class="create-time">创建日期：{{curNote.create_date_name ? curNote.create_date_name : ''}}</span>
                    <span class="update-time">更新日期：{{curNote.update_date_name ? curNote.update_date_name : ''}}</span>
                    <span class="status">
                        状态：
                        <el-tag v-if="isEditing && !isNoteUpdating">正在输入</el-tag>
                        <el-tag v-if="isNoteUpdating" type="info">保存中</el-tag>
                        <el-tag v-if="!isEditing && !isNoteUpdating && notesData.length !== 0" type="success">已保存</el-tag>
                    </span>
                </div>
                <div class="buttons">
                    <el-button size="mini" @click="previewNote" v-show="!isPreview" :disabled="notesData.length == 0 && noteBookList.length == 0"><i class="el-icon-view"></i> 预览</el-button>
                    <el-button size="mini" @click="previewNote" v-show="isPreview"><i class="el-icon-back"></i> 返回编辑</el-button>
                    <el-button size="mini" type="danger" @click="_deleteNote" :disabled="notesData.length == 0 && noteBookList.length == 0"><i class="el-icon-delete"></i> 删除</el-button>
                </div>
            </div>
            <div class="main" v-if="notesData.length !== 0 || showEditor">
                <div class="note-title">
                    <input type="text" placeholder="请输入标题" :value="curNote.title ? curNote.title : ''" @focus="onEditStatusChange" @input="onNoteTitleChange">
                </div>
                <div class="note-content">
                    <textarea v-show="!isPreview" placeholder="写点什么吧~ 支持Markdown语法" :value="curNote.content" @input="onNoteContentChange" @focus="onEditStatusChange"></textarea>
                    <div class="preview markdown-body" v-show="isPreview" v-html="markdown"></div>
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
    // components: {
    //     NoteContent
    // },
    data() {
        return {
            noteBookId: '',
            isEditing: false,
            isNoteUpdating: false,
            isPreview: false,
            showEditor: false,
            timeId: '',
            markdown: ''
        };
    },
    watch: {
        '$route': function(val) {
            // console.log(val)
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.noteBookId = to.params.notebook_id
        next()
    },
    computed: {
        ...mapGetters([
            'setCurNoteBook',
            'noteBookList',
            'notesData',
            'curNoteBook',
            'curNote'
        ])
    },
    created() {
        this.checkLogin().then(res => {
            if (this.$route.params.notebook_id !== '') {
                this.noteBookId = this.$route.params.notebook_id
            }
            this._getNoteBookList()
        })
        .catch(res => {
            this.$message({
                message: '请先登录',
                type: 'error'
            })
            this.$router.push({path: '/login'})
        })
    },
    methods: {
        ...mapMutations([
            'setCurNote'
        ]),
        ...mapActions([
            'getNoteBookList',
            'getNotesData',
            'createNote',
            'updateNote',
            'deleteNote',
            'checkLogin'
        ]),
        _getNoteBookList() {
            this.getNoteBookList().then(() => {
                if (this.noteBookId == '') {
                    this.$route.params.notebook_id = this.noteBookList[0].id
                    this.noteBookId = this.noteBookList[0].id
                    this.$store.commit('setCurNoteBook', {curNoteBook: this.noteBookList[0]})
                }
                else {
                    this.noteBookId = this.$route.params.notebook_id
                    this.noteBookList.forEach(item => {
                        if (item.id == this.noteBookId) {
                            this.$store.commit('setCurNoteBook', {curNoteBook: item})
                        }
                    })
                }
                this.getNotesData({noteBookId: this.noteBookId}).then(() => {
                    if (this.notesData.length !== 0) {
                        this.setCurNote({curNote: this.notesData[0]})
                    }
                })
            })
        },
        // 下拉菜单点击
        dropMenuChange(item) {
            this.$router.push({name: 'note', params: {notebook_id: item.id}})
            this.$store.commit('setCurNoteBook', {curNoteBook: item})
            this.noteBookId = item.id
            this.isPreview = false
            this.getNotesData({noteBookId: item.id})
        },
        // 每个笔记点击时
        onNoteClick(row, event, column) {
            this.$store.commit('setCurNote', {curNote: row})
            this.isNoteUpdating = false
            this.isEditing = false
            this.isPreview = false
        },
        addNote() {
            let newNote = {
                title: '新的笔记',
                content: ''
            }
            newNote.noteBookId = this.noteBookId
            this.showEditor = true
            this.isPreview = false
            this.createNote(newNote)
            this.$store.commit('setCurNote', {curNote: newNote})
        },
        // 笔记内容修改
        onNoteContentChange(val) {
            let _this = this
            let newCurNote = this.curNote
            newCurNote.content = val.target.value
            this.$store.commit('setCurNote', {curNote: newCurNote})
            this.isEditing = true
            //节流
            clearTimeout(this.timeId)
            this.timeId = setTimeout(function () {
                _this.isNoteUpdating = true
                _this.updateNote({noteId: _this.curNote.id, title: _this.curNote.title, content: _this.curNote.content})
                    .then(() => {
                        _this.isNoteUpdating = false
                        _this.isEditing = false
                    })
            }, 1000)
        },
        // 笔记标题修改
        onNoteTitleChange(val) {
            let _this = this
            let newCurNote = this.curNote
            newCurNote.title = val.target.value
            this.$store.commit('setCurNote', {curNote: newCurNote})
            this.isEditing = true
            //节流
            clearTimeout(this.timeId)
            this.timeId = setTimeout(function () {
                _this.isNoteUpdating = true
                _this.updateNote({noteId: _this.curNote.id, title: _this.curNote.title, content: _this.curNote.content})
                    .then(() => {
                        _this.isNoteUpdating = false
                        _this.isEditing = false
                    })
            }, 1000)
        },
        // 笔记状态修改
        onEditStatusChange() {
            this.isEditing = true
        },
        // 删除
        _deleteNote() {
            this.deleteNote({noteId: this.curNote.id}).then(() => {
                this.isNoteUpdating = false
                this.isEditing = false
                this.isPreview = false
                this.markdown = ''
                this.getNotesData({noteBookId: this.noteBookId}).then(() => {
                    let voidNote = {
                        create_date_name: '',
                        update_date_name: '',
                        title: '',
                        content: ''
                    }
                    this.setCurNote({ curNote: this.notesData[0] || {} })
                })
            })
            .catch(res => {
                this.isNoteUpdating = false
                this.isEditing = true
                this.isPreview = false
            })
        },
        // 预览
        previewNote() {
            this.markdown = md.render(this.curNote.content)
            if (this.isPreview) {
                this.isPreview = false
            }
            else {
                this.isPreview = true
            }
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
        width: 320px;
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
                top: 48%;
                transform: translateY(-50%);
            }
            .dropdown {
                left: -10px;
                display: flex;
                align-items: center;
                .el-dropdown-link {
                    position: relative;
                    max-width: 100px;
                    display: inline-block;
                    color: #222;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .el-icon-arrow-down {
                    margin-top: 3px;
                    margin-left: 5px;
                }
            }
        }
        .main {
            background: #e9eef3;
            .list {
                overflow-y: auto;
                max-height: calc(100vh - 60px);
            }
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
                    span {
                        height: 16px;
                        line-height: 16px;
                        max-width: 200px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            .table tr{
                background: #e9eef3;
            }
        }
    }
    .right-container {
        flex-grow: 1;
        min-width: 540px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .header {
            width: 100%;
            min-width: 540px;
            height: 60px;
            padding: 0 20px;
            color: #606266;
            display: flex;
            justify-content: flex-start;
            .info {
                flex-grow: 1;
                width: 430px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
                margin-right: 10px;
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
                    width: 120px;
                    display: inline-block;
                    margin-left: 10px;
                }
            }
            .buttons {
                width: 180px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
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
            .preview {
                width: 100%;
                overflow-y: auto;
                padding: 6px 0;
                font-size: 16px;
                pre {
                    background: #EBEEF5;
                    padding: 10px;
                    border-radius: 10px;
                    code {
                        line-height: 1.5;
                        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
                    }
                }
                ul,li,ol {
                    list-style-type: disc;
                }
            }
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