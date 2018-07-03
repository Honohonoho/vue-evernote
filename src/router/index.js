import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import NoteBooksList from '@/view/noteBooksList'
import NoteBookDetail from '@/view/noteBookDetail'
import TrashDetail from '@/view/trash'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/notebookslist',
            name: 'notebookslist',
            component: NoteBooksList
        },
        {
            path: '/note/:notebook_id',
            name: 'note',
            component: NoteBookDetail
            // children: [
            //     {
            //       // 当 /user/:id/profile 匹配成功，
            //       // UserProfile 会被渲染在 User 的 <router-view> 中
            //       path: ':note_id',
            //       name: 'note_detail',
            //       component: NoteContent
            //     }
            // ]
        },
        {
            path: '/trash',
            name: 'trash',
            component: TrashDetail
        }
    ]
})

