<template>
    <div id="notebook-detail" class="main-page-container">
        <div class="left-container">
            <div class="header">
                <p class="title">废纸篓</p>
            </div>
            <div class="main">
                <div class="list">
                    <el-table class="table" :data="trashNotes" style="width: 100%" @row-click="onNoteClick" row-class-name="table-row" header-row-class-name="table-header">
                        <el-table-column prop="create_date_name" label="更新时间" width="100"></el-table-column>
                        <el-table-column prop="title" label="笔记标题">
                            <template slot-scope="scope">
                                <router-link class="table-link" :to="{ path: '/trash', query: { note_id: scope.row.id } }">
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
                    <span class="create-time">创建日期：{{curTrashNote.create_date_name || ''}}</span>
                    <span class="update-time">更新日期：{{curTrashNote.update_date_name || ''}}</span>
                    <span class="belong-to">所属笔记本：{{belongTo.title || ''}}</span>
                </div>
                <div class="buttons">
                    <el-button size="mini" type="danger" @click="_deleteNote" :disabled="trashNotes.length == 0"><i class="el-icon-delete"></i> 彻底删除</el-button>
                    <el-button size="mini" type="success" @click="_revertNote" :disabled="trashNotes.length == 0"><i class="el-icon-refresh"></i> 恢复</el-button>
                </div>
            </div>
            <div class="main" v-if="isPreview">
                <div class="note-title">
                    <p class="title">{{curTrashNote.title}}</p>
                </div>
                <div class="note-content">
                    <div class="preview markdown-body" v-html="markdown"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
    // components: {
    //     NoteContent
    // },
    data() {
        return {
            markdown: '',
            belongTo: {},
            isPreview: false
        };
    },
    watch: {
    },
    computed: {
        ...mapGetters([
            'trashNotes',
            'curTrashNote',
            'noteBookList'
        ])
    },
    created() {
        this.checkLogin().then(res => {
            this.getTrashNotes().then(() => {
                if (!this.trashNotes.length == 0) {
                    this.setCurTrashNote({curTrashNoteId: this.trashNotes[0].id})
                    this.belongTo = this.noteBookList.find(noteBook => {
                        if (noteBook.id == this.trashNotes[0].notebookId) {
                            return noteBook
                        }
                    })
                    this.previewNote()
                }
            })
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
           'setCurTrashNote'
        ]),
        ...mapActions([
            'getTrashNotes',
            'deleteTrashNote',
            'revertTrashNote',
            'checkLogin'
        ]),
        // 每个笔记点击时
        onNoteClick(row, event, column) {
            this.setCurTrashNote({curTrashNoteId: row.id})
        },
        // 删除
        _deleteNote() {
            this.deleteTrashNote({noteId: this.curTrashNote.id}).then(() => {
                this.getTrashNotes()
                this.setCurTrashNote({curTrashNoteId: ''})
                this.markdown = ''
                if (this.trashNotes.length == 0) {
                    this.belongTo.title = ''
                }
            })
        },
        _revertNote() {
            this.revertTrashNote({noteId: this.curTrashNote.id}).then(() => {
                this.getTrashNotes()
                this.setCurTrashNote({curTrashNoteId: ''})
                this.markdown = ''
                if (this.trashNotes.length == 0) {
                    this.belongTo.title = ''
                }
            })
        },
        // 预览
        previewNote() {
            this.markdown = md.render(this.curTrashNote.content)
            this.isPreview = true
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
            justify-content: center;
            .title {
                font-size: 18px;
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
                width: 520px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
                margin-right: 10px;
                .create-time {
                    display: inline-block;
                    width: 160px;
                }
                .update-time {
                    display: inline-block;
                    width: 160px;
                    margin-left: 10px;
                }
                .belong-to {
                    min-width: 180px;
                    height: 19px;
                    line-height: 20px;
                    display: inline-block;
                    margin-left: 10px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
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
            .title {
                width: 100%;
                background: #F2F6FC;
                height: 54px;
                line-height: 54px;
                font-size: 24px;
                color: #606266;
                margin: 0;
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
                        color: 	#6495ED;
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