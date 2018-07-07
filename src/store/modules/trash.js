import Trash from '@/servers/trash'
import { Message } from 'element-ui';

const state = {
    trashNotes: null,
    curTrashNoteId: null,
    curTrashNote: null
}

const getters = {
    trashNotes: state => state.trashNotes || [],
    curTrashNote: state => state.curTrashNote || {},
}

const mutations = {
    setTrashNotes(state, payload) {
        state.trashNotes = payload.trashNotes
    },
    setCurTrashNote(state, payload) {
        state.curTrashNoteId = payload.curTrashNoteId
        state.curTrashNote = state.trashNotes.find(note => {
            return note.id == payload.curTrashNoteId
        }) || {}
    },
    addTrashNote(state, payload) {
    },
    deleteTrashNote(state, payload) {
        state.trashNotes = state.trashNotes.filter(note => {
            return note.id !== payload.noteId
        })
    }
}

const actions = {
    getTrashNotes({commit}) {
        return Trash.get().then(res => {
            commit('setTrashNotes', {trashNotes: res.data})
        })
    },
    deleteTrashNote({commit}, { noteId }) {
        return Trash.delete({ noteId }).then(res => {
            commit('deleteTrashNote', { noteId })
            Message({
                message: '删除成功',
                type: 'success'
            })
        }).catch(res => {
            Message({
                message: res.msg,
                type: 'error'
            })
        })
    },
    revertTrashNote({commit}, {noteId}) {
        return Trash.revert({noteId}).then(res => {
            commit('deleteTrashNote', {noteId})
            Message({
                message: '恢复成功',
                type: 'success'
            })
        }).catch(res => {
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