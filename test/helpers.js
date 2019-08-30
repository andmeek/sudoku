require('jsdom-global')()

import Game from '../src/models/game.js'
import Grid from '../src/models/grid.js'
import Board from '../src/models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from '../src/variables.js'
import '../src/array.js'
import '../src/number.js'

global.genTestGame = function() {
  var game = new Game()
  game.difficulty = 'Easy'
  var grid = new Grid()
  grid.values = TEST_BOARD.clone()
  grid.states = TEST_BOARD_STATE.clone()
  game.board = new Board(grid)

  return game
}

global.completeNumber = function(game, number) {
  game.board.tiles.forEach((tile) => {
    if(tile.actualValue == number)
      tile.userValue = tile.actualValue
  })
}

global.completeBoard = function(board) {
  board.tiles.forEach((tile) => {
    tile.userValue = tile.actualValue
  })
}

global.newboard = global.genTestGame
