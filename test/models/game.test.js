import Game from '../../src/models/game.js'

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
      completeNumber(game, 1)

      game.currentInput = 1
      expect(game.currentInput).toBeNull()
    })
  })
})
