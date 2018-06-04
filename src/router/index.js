import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import NoteBooksList from '@/view/noteBooksList'
import NoteBookDetail from '@/view/noteBookDetail'
import TrashDetail from '@/view/trash'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/notebookslist',
            component: NoteBooksList
        },
        {
            path: '/note/:note_id',
            component: NoteBookDetail
        },
        {
            path: '/trash/:note_id',
            component: TrashDetail
        }
    ]
})

