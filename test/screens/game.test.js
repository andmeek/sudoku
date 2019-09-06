import { shallowMount } from '@vue/test-utils'
import Game from '../../src/screens/game.vue'
import Database from '../../src/database.js'
import indexedDB from 'fake-indexeddb'

jest.useFakeTimers()

global.indexedDB = indexedDB

describe('Game.vue', () => {
  let wrapper, game

  beforeEach(() => {
    game = genTestGame()

    wrapper = shallowMount(Game, {
      propsData: {
        game: game
      }
    })
  })

  afterEach((done) => {
    const deleteReq = indexedDB.deleteDatabase('sudoku')

    deleteReq.onsuccess = function () {
      done()
    }
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when the board is completed', () => {
    beforeEach(() => {
      game.board.tiles.forEach((tile) => {
        tile.userValue = tile.actualValue
      })

      wrapper.vm.$forceUpdate()

      expect(game.completed).toBeTruthy()
    })

    test('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('emits a gamecompleted when the game is completed and the user clicks the okay button', () => {
      expect(wrapper.find('.completed')).toBeTruthy()

      wrapper.find({ ref: 'gamecompleted' }).trigger('click')
      expect(wrapper.emitted().gamecompleted).toBeTruthy()
    })

    test('.confirmCompleted records the game in the databse', (done) => {
      wrapper.vm.confirmCompleted().then(() => {
        Database.games().then((games) => {
          expect(games.length).toEqual(1)

          done()
        })
      })
    })

    test('stops running the game tick', () => {
      expect(game.timer).toEqual(0)
      jest.advanceTimersByTime(3000)

      expect(game.timer).toEqual(0)
    })
  })

  test('does not increment the timer when paused', () => {
    wrapper.vm.gameTick()

    expect(game.timer).toEqual(1)

    wrapper.vm.paused = true
    wrapper.vm.gameTick()

    expect(game.timer).toEqual(1)
  })

  test('registers and removes a timer as part of the component lifecycle', () => {
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
    expect(clearInterval).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(3000)

    expect(game.timer).toEqual(3)

    wrapper.destroy()

    jest.advanceTimersByTime(1000)
    expect(clearInterval).toHaveBeenCalledTimes(1)
    expect(game.timer).toEqual(3)
  })

  describe('.exit', () => {
    test('emits an exit event', () => {
      wrapper.vm.exit()

      expect(wrapper.emitted().exit).toBeTruthy()
    })

    test('records the game in the current state', (done) => {
      wrapper.vm.exit().then(() => {
        Database.games().then((games) => {
          expect(games.length).toEqual(1)
          expect(games[0].completed).toBeFalsy()

          done()
        })
      })
    })
  })

  describe('.onVisbilityChange', () => {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true })

    test('sets the game to paused', () => {
      document.visibilityState = 'hidden'

      wrapper.vm.onVisibilityChange()

      expect(wrapper.vm.paused).toBeTruthy()
    })

    test('sets paused to false when visibile again', () => {
      document.visibilityState = 'visible'
      wrapper.vm.paused = true

      wrapper.vm.onVisibilityChange()

      expect(wrapper.vm.paused).toBeFalsy()
    })
  })
})
