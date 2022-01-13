// @ts-nocheck - may need to be at the start of file
import Vue from 'vue'
import Cision from './cision'

// @ts-ignore
Vue.use(Cision, {
    // @ts-ignore
    ...<%= JSON.stringify(options, null, 2) %>
});
