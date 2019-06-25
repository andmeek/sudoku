const SUDOKU_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const privateMethods = {
  arrayShuffle: function(baseArray, seed) {
    var arr = baseArray.clone()

    var j, x, i
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(privateMethods.random(seed) * (i + 1));
      x = arr[i];
      arr[i] = arr[j]
      arr[j] = x
    }
    return arr
  },
  random: function(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  },
  sectionValidX: function(left, right) {
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        if(left[i] == right[j])
          return false
      }
    }

    return true
  },
}

Array.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this))
}

Array.prototype.removeItem = function(val) {
  if(this.includes(val)) {
    var index = this.findIndex((n) => n == val)
    this.splice(index, 1)
  }
}

export default class Generate {
  constructor(seed) {
    this.seed = seed
  }

  board() {
    var board = this.emptyBoard
    var firstSection = privateMethods.arrayShuffle(SUDOKU_NUMBERS, this.seed)
    this.fillSection(board, 0, 0, firstSection)

    board = this.solve(board)

    if(board == false) {
      console.log(`Can't generate seed: ${this.seed}`)
      this.seed = this.seed + 1
      return this.board()
    }
    // var toFill = this.leastPotentialValues(board)

    // while(toFill.x != null) {
      // board[toFill.y][toFill.x] = toFill.vals[0]

      // toFill = this.leastPotentialValues(board)
    // }

    // var failed = 0
    // for(var y = 0; y < board.length; y++) {
      // for(var x = 0; x < board[y].length; x++) {
        // let val = board[y][x]

        // if(val == 0) {
          // failed++
        // }
      // }
    // }

    // if(failed > 0) {
      // console.log(`Can't generate seed: ${this.seed} with ${failed} failures`)
      // this.seed = this.seed + 1
      // return this.board()
    // }

    return board
  }

  boardState(board, removeCount) {
    var state = this.emptyBoard,
      boardCopy = board.clone(),
      numRemoved = 0,
      failed = 0

    do {
      var rX = this.randomSudokuNum - 1,
          rY = this.randomSudokuNum - 1

      if(state[rY][rX] == 0) {
        var val = board[rY][rX]
        board[rY][rX] = 0

        if(this.solve(board) == false) {
          board[rY][rX] = val
          failed++
        } else {
          state[rY][rX] = 1
          boardCopy[rY][rX] = 0
          board = boardCopy.clone()
          numRemoved++
        }
      }

    } while(numRemoved < removeCount)

    console.log(`failed ${failed} times`)

    return state
  }

  get randomSudokuNum() {
    return Math.ceil(Math.random() * 9)
  }

  get emptyBoard() {
    return Array(9).fill(0).map(() => { return Array(9).fill(0) })
  }

  potentialValues(board, forX, forY) {
    var ret = SUDOKU_NUMBERS.clone()
    for(var y = 0; y < board.length; y++) {
      for(var x = 0; x < board[y].length; x++) {
        let val = board[y][x]
        if(val != 0) {
          if(x == forX) {
            ret.removeItem(val)
          } else if(y == forY) {
            ret.removeItem(val)
          }
        }
      }
    }

    this.sectionToArray(board, (forX - forX % 3) / 3, (forY - forY % 3) / 3).forEach((v) => {
      if(v != 0) {
        ret.removeItem(v)
      }
    })

    return ret
  }

  fillSection(board, x, y, vals) {
    board[y * 3][x * 3] = vals[0]
    board[y * 3][x * 3 + 1] = vals[1]
    board[y * 3][x * 3 + 2] = vals[2]
    board[y * 3 + 1][x * 3] = vals[3]
    board[y * 3 + 1][x * 3 + 1] = vals[4]
    board[y * 3 + 1][x * 3 + 2] = vals[5]
    board[y * 3 + 2][x * 3] = vals[6]
    board[y * 3 + 2][x * 3 + 1] = vals[7]
    board[y * 3 + 2][x * 3 + 2] = vals[8]

    return board
  }

  leastPotentialValues(board) {
    var ret = {x: null, y: null, vals: []}

    for(var y = 0; y < board.length; y++) {
      for(var x = 0; x < board[y].length; x++) {
        let val = board[y][x]
        if(val == 0) {
          let potentials = this.potentialValues(board, x, y)

          if((potentials.length < ret.vals.length || ret.x == null) && potentials.length > 0) {
            ret = {x: x, y: y, vals: potentials}
          }
        }
      }
    }

    return ret
  }

  sectionToArray(board, x, y) {
    return [
      board[y * 3].slice(x * 3, x* 3 + 3),
      board[y * 3 + 1].slice(x * 3, x* 3 + 3),
      board[y * 3 + 2].slice(x * 3, x* 3 + 3),
    ].flat()
  }

  solve(board) {
    var toFill = this.leastPotentialValues(board)

    while(toFill.x != null) {
      board[toFill.y][toFill.x] = toFill.vals[0]

      toFill = this.leastPotentialValues(board)
    }

    for(var y = 0; y < board.length; y++) {
      for(var x = 0; x < board[y].length; x++) {
        if(board[y][x] == 0)
          return false
      }
    }

    return board
  }
}
