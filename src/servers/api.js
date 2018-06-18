import axios from 'axios'
import configBaseUrl from "./baseUrl"

axios.defaults.baseURL = configBaseUrl.baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true // 使用跨域请求

export default function api (url, type = 'GET', data = {}) {
    return new Promise ((resolve, reject) => {
        let options = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() == 'get') {
             options.params = data
        }
        else {
            options.data = data
        }
        axios(options).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            }
            else {
                reject(res.data)
            }
        }).catch(err => {
            console.error({msg: '网络异常'})
        })
    })
}