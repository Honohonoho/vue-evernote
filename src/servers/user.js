import api from './api'

// 登录、注册、注销相关接口
const USER_BASE_API = '/auth'

const USER_API = {
    REGISTER: `${USER_BASE_API}/register`,
    LOGON: `${USER_BASE_API}/login`,
    LOGOUT: `${USER_BASE_API}/logout`,
    GET_USERINFO: `${USER_BASE_API}`
}

export default {
    register({username, password}) {
        return api(USER_API.REGISTER, 'POST', {username, password})
    },
    login({username, password}) {
        return api(USER_API.LOGON, 'POST', {username, password})
    },
    logout() {
        return api(USER_API.LOGOUT)
    },
    get_userinfo() {
        return api(USER_API.GET_USERINFO)
    }
}