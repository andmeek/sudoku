require('jsdom-global')()

import Board from '../src/models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from '../src/variables.js'
import '../src/array.js'

global.genTestBoard = function() {
  return new Board(TEST_BOARD, TEST_BOARD_STATE)
}
