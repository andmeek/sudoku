import { TEST_BOARD, TEST_BOARD_STATE } from '../variables.js'
import Grid from '../../src/models/grid.js'

describe('Grid', () => {
  var grid

  beforeEach(() => {
    grid = new Grid()
  })

  test('initialization creates a 0 filled grid', () => {
    var values = grid.values,
        state = grid.state

    expect(values.length).toEqual(9)
    expect(values[0].length).toEqual(9)
    expect(values.flat().length).toEqual(81)
    expect(values.flat().distinct()).toEqual([0])

    expect(state.flat().length).toEqual(81)
    expect(state.flat().distinct()).toEqual([0])
  })

  describe('.fillSection', () => {
    test('translates a flat array into a given section of the board', () => {
      let sudokuNums = [9, 5, 4, 3, 1, 7, 2, 6, 8]

      grid.fillSection(0, 0, sudokuNums)
      grid.fillSection(2, 2, sudokuNums)

      expect(grid.sectionToArray(0, 0)).toEqual(sudokuNums)
      expect(grid.sectionToArray(2, 2)).toEqual(sudokuNums)
    })
  })

  describe('.hasEmptyValues', () => {
    test('returns true with an empty grid', () => {
      expect(grid.hasEmptyValues()).toBeTruthy()
    })

    test('returns false with a populated grid', () => {
      grid.values = TEST_BOARD

      expect(grid.hasEmptyValues()).toBeFalsy()
    })

    test('returns true if even just one value is empty', () => {
      grid.values = TEST_BOARD
      grid.values[5][5] = 0

      expect(grid.hasEmptyValues()).toBeTruthy()
    })
  })

  describe('.isEmpty', () => {
    test('returns true on an empty grid', () => {
      expect(grid.isEmpty()).toBeTruthy()
    })

    test('returns false if at least one value is not 0', () => {
      grid.values[0] = 9

      expect(grid.isEmpty()).toBeFalsy()
    })
  })

  describe('.potentialValues', () => {
    test('returns the potential values for a given x, y coordinate', () => {
      expect(grid.potentialValues(0, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(grid.potentialValues(0, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    test('returns the potential values less whats in the current section', () => {
      grid.values[1][1] = 7
      expect(grid.potentialValues(0, 0)).toEqual([1, 2, 3, 4, 5, 6, 8, 9])
      expect(grid.potentialValues(0, 1)).toEqual([1, 2, 3, 4, 5, 6, 8, 9])

      grid.values[8][8] = 6
      expect(grid.potentialValues(7, 8)).toEqual([1, 2, 3, 4, 5, 7, 8, 9])
    })

    test('returns the potential values considering state for a given x, y coordinate', () => {
      grid.values = TEST_BOARD
      grid.state = TEST_BOARD_STATE

      expect(grid.potentialValues(0, 1, true)).toEqual([6, 8])
      expect(grid.potentialValues(4, 1, true)).toEqual([6, 7])
      expect(grid.potentialValues(8, 6, true)).toEqual([4])
    })
  })

  describe('.sectionToArray', () => {
    test('returns a given section of the board by x,y as a flat array', () => {
      grid.values = TEST_BOARD

      expect(grid.sectionToArray(0, 0)).toEqual([4, 3, 5, 6, 8, 2, 1, 9, 7])
      expect(grid.sectionToArray(2, 2)).toEqual([8, 7, 4, 1, 3, 6, 2, 5, 9])
    })

    test('returns a given section considering grid state if specified', () => {
      grid.values = TEST_BOARD
      grid.state = TEST_BOARD_STATE

      expect(grid.sectionToArray(0, 0, true)).toEqual([4, 3, 5, null, null, 2, null, null, 7])
      expect(grid.sectionToArray(2, 2, true)).toEqual([8, null, null, 1, null, null, 2, 5, 9])
    })
  })

  describe('.val', () => {
    test('returns the value at the x y where 0,0 is the top left of the grid', () => {
      grid.values[0][0] = 9
      grid.values[8][4] = 4
      grid.values[8][4] = 4

      expect(grid.val(0, 0, false)).toEqual(9)
      expect(grid.val(0, 0, true)).toEqual(9)
      expect(grid.val(4, 8)).toEqual(4)
      expect(grid.val(5, 5)).toEqual(0)
    })

    test('returns null for invalid x,y coordinates', () => {
      expect(grid.val(-1, 0)).toBeNull()
      expect(grid.val(9, 9)).toBeNull()
      expect(grid.val(10, 20)).toBeNull()
    })

    describe('when considering the grid state', () => {
      beforeEach(() => {
        grid.values = TEST_BOARD
        grid.state = TEST_BOARD_STATE
      })

      test('returns null if the state equals 1, hidden', () => {
        expect(grid.val(0, 1, true)).toBeNull()
      })

      test('returns the value if the state equals 1 while explicitly ignoring state', () => {
        expect(grid.val(0, 1, false)).toEqual(6)
      })

      test('returns the value if the state is 0, not hidden', () => {
        expect(grid.val(0, 0, true)).toEqual(4)
      })
    })
  })
})