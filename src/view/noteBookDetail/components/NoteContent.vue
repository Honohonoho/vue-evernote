<template>
    <div class="editor">
        <div class="header">
            <div class="info">
                <span class="create-time">创建日期：{{createTime}}</span>
                <span class="update-time">更新日期：{{updateTime}}</span>
                <span class="status">状态：{{noteStatus}}</span>
            </div>
            <div class="buttons">
                <span>预览</span>
                <span>删除</span>
            </div>
        </div>
        <div class="main">
            <div class="note-title">
                <input type="text" placeholder="请输入标题" v-model="note.title" @input="titleChange">
            </div>
            <div class="note-content">
                <textarea v-model="note.content" placeholder="写点什么吧~ 支持Markdown语法"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['noteData'],
    mounted() {
        this.note = this.noteData
    },
    data() {
        return {
            createTime: '2018-01-20',
            updateTime: '1天前',
            noteStatus: '已保存',
            note: this.noteData
        }
    },
    methods: {
        titleChange() {
            this.$emit('noteTitleChange', this.note.title)
        }
    }
}
</script>

<style lang="scss">
.editor {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .header {
        width: 100%;
        height: 30px;
        padding: 0 20px;
        color: #606266;
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
</style>


