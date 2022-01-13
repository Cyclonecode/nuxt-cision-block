import Vue from 'vue'
import CisionBlock from './CisionBlock'

Vue.use(CisionBlock, {
    // TODO: Figure out why this not work with typescript
    ...<%= JSON.stringify(options, null, 2) %>
});
