import api from './api'
import {formatDate} from '@/utils/utils'

// 废纸篓相关功能
const BASE_URL = '/notes'

export default {
    // 获取删除的笔记列表
    get() {
        return new Promise((resolve, reject) => {
            let url = `${BASE_URL}/trash`
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
    // 恢复笔记
    revert({ noteId }) {
        return new Promise((resolve, reject) => {
            let url = `${BASE_URL}/${noteId}/revert`
            return api(url, 'PATCH').then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    },
    // 彻底删除笔记
    delete({noteId}) {
        let url = `${BASE_URL}/${noteId}/confirm`
        return api(url, 'DELETE')
    }
}