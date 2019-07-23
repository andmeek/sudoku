import { shallowMount } from '@vue/test-utils'
import Game from '../../src/screens/game.vue'
import GameBoard from '../../src/components/game-board.vue'

jest.useFakeTimers()

describe('Game.vue', () => {
  let wrapper, board

  beforeEach(() => {
    board = genTestBoard()
    wrapper = shallowMount(Game, {
      propsData: {
        difficulty: 'Easy',
        board: board
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('propagates the input change to the gameboard', () => {
    wrapper.vm.inputChanged(2, false)

    expect(wrapper.find(GameBoard).vm.currentInput).toEqual(2)
    expect(wrapper.find(GameBoard).vm.pencil).toBeFalsy()

    wrapper.vm.inputChanged(8, true)
    expect(wrapper.find(GameBoard).vm.currentInput).toEqual(8)
    expect(wrapper.find(GameBoard).vm.pencil).toBeTruthy()
  })

  describe('when the board is completed', () => {
    beforeEach(() => {
      board.tiles.forEach((tile) => {
        tile.userValue = tile.actualValue
      })

      wrapper.vm.$forceUpdate()

      expect(board.completed).toBeTruthy()
    })

    test('emits a gamecompleted when the game is completed and the user clicks the okay button', () => {
      expect(wrapper.find('.completed')).toBeTruthy()

      wrapper.findAll('button').at(0).trigger('click')
      expect(wrapper.emitted().gamecompleted).toBeTruthy()
    })

    test('stops running the game tick', () => {
      expect(board.timer).toEqual(0)
      jest.advanceTimersByTime(3000)

      expect(board.timer).toEqual(0)
    })
  })

  test('registers and removes a timer as part of the component lifecycle', () => {
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
    expect(clearInterval).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(3000)

    expect(board.timer).toEqual(3)

    wrapper.destroy()

    jest.advanceTimersByTime(1000)
    expect(clearInterval).toHaveBeenCalledTimes(1)
    expect(board.timer).toEqual(3)
  })
})
