import Vue from 'vue'
import App from './app.vue'
import './array.js'
import './number.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEraser, faLightbulb, faPencilAlt, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Console from './console.js'

library.add(faEraser, faLightbulb, faPencilAlt, faStickyNote)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

var app = new Vue({
  el: '#game',
  template: '<App />',
  components: { App }
})

window.c = new Console(app)
