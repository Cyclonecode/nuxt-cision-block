import Vue from 'vue'
import CisionBlock from './CisionBlock'
import Options from './Options'

const options: Options = JSON.parse('<%= JSON.stringify(options) %>')

Vue.use(CisionBlock, {
    ...options,
})
