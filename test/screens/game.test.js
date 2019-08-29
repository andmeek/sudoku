import { shallowMount } from '@vue/test-utils'
import Game from '../../src/screens/game.vue'
import GameBoard from '../../src/components/game-board.vue'

jest.useFakeTimers()

describe('Game.vue', () => {
  let wrapper, game

  beforeEach(() => {
    game = genTestGame()

    wrapper = shallowMount(Game, {
      propsData: {
        game: game
      },
    })
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

      wrapper.findAll('button').at(0).trigger('click')
      expect(wrapper.emitted().gamecompleted).toBeTruthy()
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

  describe('.onVisbilityChange', () => {
    Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: true})

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
