import Game from '../../src/models/game.js'

jest.useFakeTimers()

describe('Game', () => {
  var game

  beforeEach(() => {
    game = genTestGame()
  })

  test('initialization', () => {
    game = new Game()
    expect(game.board).toBeNull()
    expect(game.completed).toBeFalsy()
    expect(game.currentInput).toBeNull()
    expect(game.difficulty).toBeNull()
    expect(game.draftMode).toBeFalsy()
    expect(game.eraserMode).toBeFalsy()
    expect(game.hintTile).toBeNull()
    expect(game.mistakes).toEqual(0)
    expect(game.seed).toBeNull()
    expect(game.showAllNotes).toBeFalsy()
    expect(game.timer).toEqual(0)
  })

  describe('.incrementTimer', () => {
    test('increases the timer by 1', () => {
      game.incrementTimer()
      expect(game.timer).toEqual(1)

      game.incrementTimer()
      expect(game.timer).toEqual(2)
    })
  })

  describe('.completed', () => {
    test('is false', () => {
      expect(game.completed).toBeFalsy()
    })

    test('is true when all the tiles are completed', () => {
      game.board.tiles.forEach((tile) => {
        tile.userValue = tile.actualValue
      })

      expect(game.completed).toBeTruthy()
    })
  })

  describe('.currentInput', () => {
    test('sets the currentInput value', () => {
      game.currentInput = 1

      expect(game.currentInput).toEqual(1)
    })

    test('sets the currentInput to null if provided the same value', () => {
      game.currentInput = 1
      game.currentInput = 1

      expect(game.currentInput).toBeNull()
    })

    test('it does not set the current value if that number is completed on the board', () => {
      completeNumber(game.board, 1)

      game.currentInput = 1
      expect(game.currentInput).toBeNull()
    })

    test('sets to null and toggles eraser mode on when set to 0', () => {
      game.currentInput = 0

      expect(game.currentInput).toBeNull()
      expect(game.eraserMode).toBeTruthy()
    })

    test('sets to null and sets eraser mode to false when set to 0 and already in eraser mode', () => {
      game.currentInput = 0
      game.currentInput = 0

      expect(game.currentInput).toBeNull()
      expect(game.eraserMode).toBeFalsy()
    })

    test('unsets eraser mode when set to anything > 0', () => {
      game.eraserMode = true
      game.currentInput = 1

      expect(game.eraserMode).toBeFalsy()
    })
  })

  describe('.recordMistake', () => {
    test('increments the mistakes counter by 1', () => {
      expect(game.mistakes).toEqual(0)

      game.recordMistake()

      expect(game.mistakes).toEqual(1)
    })
  })

  describe('.showHint', () => {
    test('sets a hint tile that is user editable and incomplete', () => {
      game.showHint()

      expect(game.hintTile.userEditable).toBeTruthy()
      expect(game.hintTile.completed).toBeFalsy()
    })

    test('does nothing if theres no board', () => {
      game.board = null
      game.showHint()

      expect(game.hintTile).toBeNull()
    })

    test('does nothing if the board is completed', () => {
      completeBoard(game.board)

      game.showHint()

      expect(game.hintTile).toBeNull()
    })

    test('does nothing if a hint tile is already set', () => {
      game.showHint()

      var tile = game.hintTile

      game.showHint()

      expect(tile).toEqual(game.hintTile)
    })

    test('unsets the hint tile after 3 seconds', () => {
      game.showHint()
      expect(game.hintTile).not.toBeNull()

      jest.advanceTimersByTime(3000)

      expect(game.hintTile).toBeNull()
    })
  })
})
