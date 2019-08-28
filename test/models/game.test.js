import Game from '../../src/models/game.js'

describe('Game', () => {
  var game

  beforeEach(() => {
    game = new Game()
  })


  test('initialization', () => {
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
    beforeEach(() => {
      game = genTestGame()
    })

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
})
