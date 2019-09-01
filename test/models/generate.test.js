import Generate from '../../src/models/generate.js'

describe('Generate', () => {
  const seedBoardTwo = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 1, 6, 7, 4, 8, 9, 5],
    [8, 7, 5, 9, 1, 2, 3, 6, 4],
    [6, 9, 4, 5, 3, 8, 2, 1, 7],
    [3, 1, 7, 2, 6, 5, 9, 4, 8],
    [5, 4, 2, 8, 9, 7, 6, 3, 1],
    [9, 6, 8, 3, 4, 1, 5, 7, 2]
  ]

  describe('.board', () => {
    test('returns a grid filled based upon a specified seed', () => {
      var grid = Generate.board(2)

      expect(grid.hasEmptyValues()).toBeFalsy()
      expect(grid.values).toEqual(seedBoardTwo)
      expect(grid.seed).toEqual(2)
    })

    test('returns a grid from a seed that has a valid solution', () => {
      var grid = Generate.board(1)

      expect(grid.hasEmptyValues()).toBeFalsy()
      expect(grid.values).toEqual(seedBoardTwo)
      expect(grid.seed).toEqual(2)
    })
  })

  describe('.boardState', () => {
    test('updates the grids state with the number to be removed requested', () => {
      var grid = Generate.board(10)

      expect(grid.states.flat().distinct()).toEqual([0])

      Generate.boardState(grid, 10)

      const removed = grid.states.flat().filter((n) => n === 1)
      expect(removed.length).toEqual(10)
    })
  })
})
