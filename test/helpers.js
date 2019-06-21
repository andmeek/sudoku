require('jsdom-global')()

import Board from '../src/models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from './variables.js'

global.genTestBoard = function() {
  return new Board(TEST_BOARD, TEST_BOARD_STATE)
}
