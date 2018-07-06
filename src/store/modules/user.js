import User from '@/servers/user'
import { Message } from 'element-ui';
const state = {
    user: null
}
const getters = {
    username: state => state.user === null ? '未登录' : state.user.username,
    slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}
const mutations = {
    /**
     * @param {Object} payload 设置当前用户
     */
    setUser(state, payload) {
        state.user = payload.user
    }
}
const actions = {
    login({commit}, { username, password }) {
        return User.login({ username, password }).then(res => {
            console.log(res)
            commit('setUser', {user: res.data})
        })
    },
    register({commit}, { username, password }) {
        return User.register({ username, password }).then(res => {
            console.log(res)
            commit('setUser', {user: res.data})
        })
    },
    logout({commit}) {
        return User.logout().then(res => {
            console.log(res)
        })
    },
    checkLogin({commit}) {
        return new Promise((resolve, reject) => {
            User.getUserInfo().then(res => {
                if (res.isLogin) {
                    commit('setUser', {user: res.data})
                    resolve(res)
                }
                else {
                    reject(res)
                }
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