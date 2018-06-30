export function formatDate(date) {
    let dateObj = typeof date === 'object' ? date : new Date(date)
    let time = dateObj.getTime()
    let now = new Date().getTime() // 1970 年 1 月 1日午夜与当前日期和时间之间的毫秒数。
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
            text = formatDateTime(dateObj)
    }
    function formatDateTime(date) {  
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m  
        let d = date.getDate()  
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
        // let h = date.getHours()  
        // h = h < 10 ? ('0' + h) : h  
        // let minute = date.getMinutes() 
        // minute = minute < 10 ? ('0' + minute) : minute
        // let second = date.getSeconds()  
        // second = second < 10 ? ('0' + second) : second
        // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
    return text
}