import Board from '../../src/models/board.js'
import Tile from '../../src/models/tile.js'
import {TEST_BOARD, TEST_BOARD_STATE} from '../../src/variables.js'

describe('Board', () => {
  var board;

  beforeEach(() => {
    board = new Board(TEST_BOARD, TEST_BOARD_STATE)
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
      board.tiles.forEach((tile) => {
        tile.userValue = tile.actualValue
      })

      expect(board.completed).toBeTruthy()
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
      board.tiles.forEach((tile) => {
        if(tile.actualValue == 1) {
          tile.userValue = tile.actualValue
        }
      })

      expect(board.numberCompleted(1)).toBeTruthy()
      expect(board.numberCompleted(2)).toBeFalsy()
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
