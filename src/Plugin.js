import Vue from 'vue'
import Cision from './cision'

Vue.use(Cision, {
    // TODO: Figure out why this not work with typescript
    ...<%= JSON.stringify(options, null, 2) %>
});
