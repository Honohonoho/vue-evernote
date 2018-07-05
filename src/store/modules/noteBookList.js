import NoteBooksListService from '@/servers/noteBooksListService'
import { Message } from 'element-ui';
const state = {
    noteBookList: null
}
const getters = {
    noteBookList: state => state.noteBookList || []
}
const mutations = {
    /**
     * @param {Array} payload 获取到笔记本列表后设置
     */
    setNoteBookList(state, payload) {
        state.noteBookList = payload.noteBookList
    },
    /**
     * 
     * @param {Object} payload 新的笔记本对象
     */
    createNoteBook(state, payload) {
        state.noteBookList.unshift(payload.noteBook)
    },
    /**
     * 
     * @param {Object} payload 修改的笔记本对象
     */
    updateNoteBook(state, payload) {
        let noteBook = state.noteBookList.find(noteBook => noteBook.id === payload.id || {})
        noteBook.title = payload.title
    },
    /**
     * @param {Object} payload 删除的笔记本对象
     */
    deleteNoteBook(state, payload) {
        state.noteBookList = state.noteBookList.filter(noteBook => noteBook.id !== payload.id)
    },
}
const actions = {
    getNoteBookList({ commit }) {
        return NoteBooksListService.get().then(res => {
            commit('setNoteBookList', {noteBookList: res.data})
        })
    },
    createNoteBook({ commit }, payload) {
        NoteBooksListService.create({title: payload.title}).then(res => {
            commit('createNoteBook', {noteBook: res.data})
            NoteBooksListService.get().then(response => {
                commit('setNoteBookList', {noteBookList: response.data})
            })
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
    updateNoteBook({ commit }, payload) {
        NoteBooksListService.create({id: payload.id, title: payload.title}).then(res => {
            commit('updateNoteBook', {id: payload.id, title: payload.title})
            Message({
                message: '修改成功~',
                type: 'success'
            })
        }).catch((res) => {
            Message({
                message: res.msg,
                type: 'error'
            })
        })
    },
    deleteNoteBook({ commit }, payload) {
        console.log(payload)
        NoteBooksListService.delete({id: payload.id}).then(res => {
            commit('deleteNoteBook', {id: payload.id})
            Message({
                type: 'success',
                message: '删除成功!'
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