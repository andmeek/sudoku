require('jsdom-global')()

import Grid from '../src/models/grid.js'
import Board from '../src/models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from '../src/variables.js'
import '../src/array.js'

global.genTestBoard = function() {
  var grid = new Grid()
  grid.values = TEST_BOARD.clone()
  grid.states = TEST_BOARD_STATE.clone()

  return new Board(grid)
}

global.newboard = global.genTestBoard
