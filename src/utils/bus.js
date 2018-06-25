import Vue from 'vue'

export default new Vue()

/*
usage

import Bus from '@/utils/bus.js'

监听
Bus.$on('event_name', callback)

触发
Bus.$emit('event_name', [...args])
*/