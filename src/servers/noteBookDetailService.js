import api from './api'
import {formatDate} from '@/utils/utils'

// 笔记本详情相关功能
const BASE_URL = '/notes'

export default {
    // 获取笔记列表
    get({noteBookId}) {
        return new Promise((resolve, reject) => {
            let url = `${BASE_URL}/from/${noteBookId}`
            api(url, 'GET').then(res => {
                res.data = res.data.sort((note1, note2) => {
                    return note1.createdAt < note2.createdAt
                })
                res.data.forEach(note => {
                    note.create_date_name = formatDate(note.createdAt)
                })
                res.data.forEach(note => {
                    note.update_date_name = formatDate(note.updatedAt)
                })
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    },
    // 创建笔记
    create({noteId}, {title = '', content = ''} = {title: '', content: ''}) {
        let url = `${BASE_URL}/to/${noteId}`
        return api(url, 'POST', {title, content})
    },
    // 修改笔记
    update({noteId}, {title = '', content = ''} = {title: '', content: ''}) {
        let url = `${BASE_URL}/${noteId}`
        return api(url, 'PATCH', {title ,content})
    },
    // 删除笔记
    delete({noteId}) {
        let url = `${BASE_URL}/${noteId}`
        return api(url, 'DELETE')
    }
}