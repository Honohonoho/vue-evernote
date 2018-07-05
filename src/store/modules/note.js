import NoteBookDetailService from '@/servers/noteBookDetailService'
import { Message } from 'element-ui';
const state = {
    notesData: [],
    curNoteBook: {},
    curNote: {},
}
const getters = {
    notesData: state => state.notesData,
    curNoteBook: state => state.curNoteBook,
    curNote: state => state.curNote
}
const mutations = {
    /**
     * @param {Object} payload 设置当前笔记本
     */
    setCurNoteBook(state, payload) {
        state.curNoteBook = payload.curNoteBook
    },
    /**
     * @param {Object} payload 设置当前笔记
     */
    setCurNote(state, payload) {
        state.curNote = payload.curNote
    },
    /**
     * @param {Array} payload 获取到笔记列表后设置
     */
    setNotes(state, payload) {
        state.notesData = payload.notesData
    },
    /**
     * 
     * @param {Object} payload 新的笔记对象
     */
    createNote(state, payload) {
        state.notesData.unshift(payload.note)
    },
    /**
     * 
     * @param {Object} payload 修改的笔记对象
     */
    updateNote(state, payload) {
        let note = state.notesData.find(note => note.noteId === payload.noteId || {})
        note.title = payload.title
        note.content = payload.content
    },
    /**
     * @param {Object} payload 删除的笔记对象
     */
    deleteNote(state, payload) {
        state.notesData = state.notesData.filter(note => note.id !== payload.id)
    },
}
const actions = {
    getNotesData({ commit }, { noteBookId }) {
        NoteBookDetailService.get({ noteBookId }).then(res => {
            commit('setNotes', { notesData: res.data })
        })
    },
    createNote({ commit }, { noteBookId, title, content }) {
        NoteBookDetailService.create({ noteBookId }, { title, content }).then(res => {
            commit('createNote', { note: res.data })
            Message({
                message: '创建成功，请在下方列表查看~',
                type: 'success'
            })
        }).catch((res) => {
            Message({
                message: res.msg,
                type: 'error'
            })
        })
    },
    updateNote({ commit }, { noteId, title, content }) {
        return NoteBookDetailService.update({ noteId, title, content }).then(res => {
            commit('updateNote', { noteId, title, content })
        }).catch((res) => {
            Message({
                message: res.msg,
                type: 'error'
            })
        })
    },
    deleteNote({ commit }, { noteId }) {
        return NoteBookDetailService.delete({ noteId }).then(res => {
            commit('deleteNoteBook', { noteId })
            Message({
                message: '删除成功，删除的笔记可以在废纸篓恢复哦~',
                type: 'success'
            })
        }).catch((res) => {
            Message({
                message: res.msg,
                type: 'error'
            })
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}