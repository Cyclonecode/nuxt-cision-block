import Vue from 'vue'
import CisionBlock from './CisionBlock'

const options = JSON.parse('<%= JSON.stringify(options) %>')

Vue.use(CisionBlock, {
    ...options,
})
