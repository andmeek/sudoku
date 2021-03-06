import { SUDOKU_NUMBERS } from '../variables.js'

export default class Grid {
  constructor () {
    var emptyArr = Array(9).fill(0).map(() => {
      return Array(9).fill(0)
    })

    this.values = emptyArr
    this.states = emptyArr.clone()
    this.seed = null
  }

  fillSection (sectionX, sectionY, vals) {
    this.values[sectionY * 3][sectionX * 3] = vals[0]
    this.values[sectionY * 3][sectionX * 3 + 1] = vals[1]
    this.values[sectionY * 3][sectionX * 3 + 2] = vals[2]
    this.values[sectionY * 3 + 1][sectionX * 3] = vals[3]
    this.values[sectionY * 3 + 1][sectionX * 3 + 1] = vals[4]
    this.values[sectionY * 3 + 1][sectionX * 3 + 2] = vals[5]
    this.values[sectionY * 3 + 2][sectionX * 3] = vals[6]
    this.values[sectionY * 3 + 2][sectionX * 3 + 1] = vals[7]
    this.values[sectionY * 3 + 2][sectionX * 3 + 2] = vals[8]
  }

  hasEmptyValues () {
    return this.values.flat().findIndex((v) => v === 0) > -1
  }

  isEmpty () {
    var uniq = this.values.flat().distinct()
    return uniq.length === 1 && uniq[0] === 0
  }

  leastPotentialValues (considerState = false) {
    var ret = { x: null, y: null, values: [] }

    for (var y = 0; y < this.values.length; y++) {
      for (var x = 0; x < this.values[y].length; x++) {
        const val = this.value(x, y, considerState)

        if (val === 0 || val === null) {
          const potentials = this.potentialValues(x, y, considerState)

          if ((potentials.length < ret.values.length || ret.x === null) && potentials.length > 0) {
            ret = { x: x, y: y, values: potentials }
          }
        }
      }
    }

    return ret
  }

  potentialValues (forX, forY, considerState = false) {
    var ret = SUDOKU_NUMBERS.clone()

    for (var y = 0; y < this.values.length; y++) {
      for (var x = 0; x < this.values[y].length; x++) {
        const val = this.value(x, y, considerState)
        if (val !== 0) {
          if (x === forX) {
            ret.removeItem(val)
          } else if (y === forY) {
            ret.removeItem(val)
          }
        }
      }
    }

    const sectionX = (forX - forX % 3) / 3
    const sectionY = (forY - forY % 3) / 3
    this.sectionToArray(sectionX, sectionY, considerState).forEach((v) => {
      if (v !== 0) {
        ret.removeItem(v)
      }
    })

    return ret
  }

  sectionToArray (sectionX, sectionY, considerState = false) {
    var ret = []
    for (var y = 0; y < this.values.length; y++) {
      for (var x = 0; x < this.values[y].length; x++) {
        if ((x - x % 3) / 3 === sectionX &&
            (y - y % 3) / 3 === sectionY) {
          ret.push(this.value(x, y, considerState))
        }
      }
    }

    return ret
  }

  setUserState (x, y, enabled) {
    if (this.states[y][x] !== 0) {
      this.states[y][x] = enabled ? 2 : 1
    }
  }

  state (x, y) {
    if (x < 0 || x > 8 || y < 0 || y > 8) {
      return null
    }

    return this.states[y][x]
  }

  value (x, y, considerState = false) {
    if (x < 0 || x > 8 || y < 0 || y > 8) {
      return null
    }
    let value = this.values[y][x]

    if (considerState && this.state(x, y) === 1) {
      value = null
    }

    return value
  }
}
