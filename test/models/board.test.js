import Grid from '../../src/models/grid.js'
import Board from '../../src/models/board.js'
import Tile from '../../src/models/tile.js'
import { TEST_BOARD, TEST_BOARD_STATE } from '../../src/variables.js'

describe('Board', () => {
  var grid = new Grid()
  grid.values = TEST_BOARD
  grid.states = TEST_BOARD_STATE

  var board

  beforeEach(() => {
    board = new Board(grid)
  })

  test('initialization', () => {
    expect(board.tiles.length).toEqual(81)
    expect(board.tiles[0]).toBeInstanceOf(Tile)
    expect(board.tiles[0].id).toEqual(1)
    expect(board.tiles[0].actualValue).toEqual(4)
    expect(board.tiles[0].userEditable).toEqual(false)

    var lastTile = board.tiles[80]

    expect(lastTile.actualValue).toEqual(9)
    expect(lastTile.x).toEqual(8)
    expect(lastTile.y).toEqual(8)
    expect(lastTile.userEditable).toEqual(false)
  })

  describe('.completed', () => {
    test('is false', () => {
      expect(board.completed).toBeFalsy()
    })

    test('is true when all the tiles are completed', () => {
      completeBoard(board)

      expect(board.completed).toBeTruthy()
    })
  })

  describe('.incompleteTiles', () => {
    test('returns 36 tiles for the test board state', () => {
      expect(board.incompleteTiles.length).toEqual(36)
    })

    test('returns an array of tiles that are not completed', () => {
      board.incompleteTiles.forEach((tile) => {
        expect(tile.completed).toBeFalsy()
      })
    })

    test('returns an empty array when the board is completed', () => {
      completeBoard(board)

      expect(board.incompleteTiles).toEqual([])
    })
  })

  describe('.numberCompleted', () => {
    test('is false', () => {
      expect(board.numberCompleted(1)).toBeFalsy()
    })

    test('is false when providing a non sudoku number', () => {
      expect(board.numberCompleted(0)).toBeFalsy()
    })

    test('is true when tiles for that number are completed', () => {
      completeNumber(board, 1)

      expect(board.numberCompleted(1)).toBeTruthy()
      expect(board.numberCompleted(2)).toBeFalsy()
    })

    test('is true when providing a string number', () => {
      completeNumber(board, 1)

      expect(board.numberCompleted('1')).toBeTruthy()
    })
  })

  describe('.tileAt', () => {
    test('returns the expected tile', () => {
      var tile = board.tileAt(2, 2)

      expect(tile.x).toEqual(2)
      expect(tile.y).toEqual(2)
      expect(tile.actualValue).toEqual(7)
    })

    test('returns null if the x,y doesnt exist', () => {
      expect(board.tileAt(20, 20)).toBeNull()
    })
  })

  describe('.tilesAtSection', () => {
    test('returns the expected tiles in order of left to right and top to bottom as a 1 dimension array', () => {
      var tiles = board.tilesAtSection(0, 0)
      var vals = tiles.map((tile) => { return tile.actualValue })

      expect(vals).toEqual([4, 3, 5, 6, 8, 2, 1, 9, 7])

      tiles = board.tilesAtSection(1, 1)
      vals = tiles.map((tile) => { return tile.actualValue })

      expect(vals).toEqual([1, 9, 5, 6, 8, 2, 7, 4, 3])

      tiles = board.tilesAtSection(2, 2)
      vals = tiles.map((tile) => { return tile.actualValue })

      expect(vals).toEqual([8, 7, 4, 1, 3, 6, 2, 5, 9])
    })
  })

  describe('.tileById', () => {
    test('returns null if no tile exists by that ID', () => {
      expect(board.tileById('badid')).toBeNull()
    })

    test('it returns the expected tile by its ID', () => {
      var tile = board.tiles[8]

      expect(board.tileById(tile.id)).toEqual(tile)
    })
  })
})
