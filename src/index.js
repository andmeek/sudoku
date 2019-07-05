import Vue from 'vue'
import App from './app.vue'
import './array.js'

import Grid from './models/grid.js'
import Generate from './models/generate.js'
import Board from './models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from './variables.js'

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
window.newboard = function(removeCount, seed = 1, test = false) {
  var grid

  if(test) {
    grid = new Grid()
    grid.values = TEST_BOARD
    grid.states = TEST_BOARD_STATE
  } else {
    grid = Generate.board(seed)
    Generate.boardState(grid, removeCount)
  }

  return new Board(grid)
}
