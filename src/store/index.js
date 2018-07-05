import Vue from 'vue'
import Vuex from 'vuex'
import noteBookList from './modules/noteBookList'
import note from './modules/note'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        noteBookList,
        note,
        // user,
        // trash
    }
})