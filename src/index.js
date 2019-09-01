import Vue from 'vue'
import App from './app.vue'
import './array.js'
import './number.js'

import Grid from './models/grid.js'
import Generate from './models/generate.js'
import Board from './models/board.js'
import { TEST_BOARD, TEST_BOARD_STATE } from './variables.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEraser, faLightbulb, faPencilAlt, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEraser, faLightbulb, faPencilAlt, faStickyNote)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

var app = new Vue({
  el: '#game',
  template: '<App />',
  components: { App },
  methods: {
    game: function () {
      return this.$children[0].game
    }
  }
})

window.app = app
window.newboard = function (removeCount, seed = 1, test = false) {
  var grid

  if (test) {
    grid = new Grid()
    grid.values = TEST_BOARD
    grid.states = TEST_BOARD_STATE
  } else {
    grid = Generate.board(seed)
    Generate.boardState(grid, removeCount)
  }

  return new Board(grid)
}

window.wingame = function () {
  if (app.game() != null) {
    app.game().board.tiles.forEach((tile) => {
      if (!tile.completed) {
        tile.userValue = tile.actualValue
      }
    })
  }
}
