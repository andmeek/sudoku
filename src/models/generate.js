import { SUDOKU_NUMBERS } from '../variables.js'
import Grid from './grid.js'

export default class Generate {
  static board (seed = 0) {
    var grid = new Grid()

    while (grid.hasEmptyValues()) {
      grid = new Grid()
      grid.fillSection(0, 0, SUDOKU_NUMBERS.clone().shuffleSeed(seed))

      var toFill = grid.leastPotentialValues()

      while (toFill.x != null) {
        grid.values[toFill.y][toFill.x] = toFill.values[0]

        toFill = grid.leastPotentialValues()
      }

      grid.seed = seed
      seed = seed + 1
    }

    return grid
  }

  static boardState (grid, removeCount) {
    var numRemoved = 0

    do {
      var rY = SUDOKU_NUMBERS.randomItem() - 1
      var rX = SUDOKU_NUMBERS.randomItem() - 1

      if (grid.state(rX, rY) === 0) {
        grid.states[rY][rX] = 1

        if (grid.leastPotentialValues().values.length < 3) {
          numRemoved++
        } else {
          grid.states[rY][rX] = 0
        }
      }
    } while (numRemoved < removeCount)
  }
}
