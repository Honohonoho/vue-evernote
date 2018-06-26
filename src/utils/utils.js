export function formatDate(date) {
    let dateObj = typeof date === 'object' ? date : new Date(date)
    let time = dateObj.getTime()
    let now = Date().now // 1970 年 1 月 1日午夜与当前日期和时间之间的毫秒数。
    let text = ''
    switch (true) {
        case now - time <= 1000*60 :
            text = '刚刚'
            break
        case now - time < 1000*60*60 :
            text = Math.floor((now - time) / (1000*60)) + '分钟前'
            break
        case now - time < 1000*60*60*24 :
            text = Math.floor((now - time) / (1000*60*60)) + '小时前'
        default:
            text = dateObj
    }
    return text
}