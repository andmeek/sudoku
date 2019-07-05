const SUDOKU_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default class Grid {
  constructor() {
    var emptyArr = Array(9).fill(0).map(() => {
      return Array(9).fill(0)
    })

    this.values = emptyArr
    this.state = emptyArr.clone()
  }

  fillSection(sectionX, sectionY, vals) {
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

  hasEmptyValues() {
    return this.values.flat().findIndex((v) => v == 0) > -1
  }

  isEmpty() {
    var uniq = this.values.flat().distinct()
    return uniq.length == 1 && uniq[0] == 0
  }

  potentialValues(forX, forY, considerState = false) {
    var ret = SUDOKU_NUMBERS.clone()

    for(var y = 0; y < this.values.length; y++) {
      for(var x = 0; x < this.values[y].length; x++) {
        let val = this.val(x, y, considerState)
        if(val != 0) {
          if(x == forX) {
            ret.removeItem(val)
          } else if(y == forY) {
            ret.removeItem(val)
          }
        }
      }
    }

    let sectionX = (forX - forX % 3) / 3,
        sectionY = (forY - forY % 3) / 3
    this.sectionToArray(sectionX, sectionY, considerState).forEach((v) => {
      if(v != 0) {
        ret.removeItem(v)
      }
    })

    return ret
  }

  sectionToArray(sectionX, sectionY, considerState = false) {
    var ret = []
    for(var y = 0; y < this.values.length; y++) {
      for(var x = 0; x < this.values[y].length; x++) {
        if((x - x % 3) / 3 == sectionX &&
            (y - y % 3) / 3 == sectionY) {
          ret.push(this.val(x, y, considerState))
        }
      }
    }

    return ret
  }

  val(x, y, considerState = false) {
    if(x < 0 || x > 8 || y < 0 || y > 8) {
      return null
    }
    let value = this.values[y][x]

    if(considerState && this.state[y][x] === 1) {
      value = null
    }

    return value
  }
}
