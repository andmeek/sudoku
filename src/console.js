import Database from './database.js'
import Grid from './models/grid.js'
import Generate from './models/generate.js'
import Board from './models/board.js'
import { TEST_BOARD, TEST_BOARD_STATE } from './variables.js'

export default class Console {
  constructor (vueApp) {
    this.vueApp = vueApp
  }

  get currentScreen () {
    return this.vueApp.$children[0].$children[0]
  }

  get db () {
    return Database
  }

  get game () {
    return this.vueApp.$children[0].game
  }

  newboard (removeCount, seed = 1, test = false) {
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

  wingame () {
    if (this.game != null) {
      this.game.board.tiles.forEach((tile) => {
        if (!tile.completed) {
          tile.userValue = tile.actualValue
        }
      })
    }
  }
}
