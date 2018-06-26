import api from './api'
import {formatDate} from '@/utils/utils'

// 笔记本相关功能
const NOTEBOOK_BASE_API = '/notebooks'

export default {
    get() {
        return new Promise((resolve, reject) => {
            let url = `${NOTEBOOK_BASE_API}/notebooks`
            api(url, 'GET').then(res => {
                res.data = res.data.sort((notebook1, notebook2) => {
                    notebook1.createAt < notebook2.createAt
                })
                res.data.forEach(notebook => {
                    console.log(notebook)
                    notebook.create_date_name = formatDate(notebook.createAt)
                })
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    },
    create({title = ''} = {title: ''}) {
        let url = `${NOTEBOOK_BASE_API}/notebooks`
        return api(url, 'POST', {title})
    },
    update({id, title}) {
        let url = `${NOTEBOOK_BASE_API}/notebooks/${id}`
        return api(url, 'PATCH', {title})
    },
    delete(id) {
        let url = `${NOTEBOOK_BASE_API}/notebooks/${id}`
        return api(url, 'DELETE')
    }
}