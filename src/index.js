import Vue from 'vue'
import App from './app.vue'
import Generate from './models/generate.js'

var app = new Vue({
  el: '#game',
  template: '<App />',
  components: { App },
  methods: {
    board: function() {
      return this.$children[0].board
    }
  }
})

window.app = app
window.generate = Generate
