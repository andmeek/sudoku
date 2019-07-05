import { shallowMount } from '@vue/test-utils'
import Game from '../../src/screens/game.vue'

describe('Game.vue', () => {
  let wrapper, board

  beforeEach(() => {
    board = genTestBoard()
    wrapper = shallowMount(Game, {
      propsData: {
        board: board
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits a gamecompleted when the game is completed and the user clicks the okay button', () => {
    board.tiles.forEach((tile) => {
      tile.userValue = tile.actualValue
    })

    wrapper.vm.$forceUpdate()
    expect(wrapper.find('.completed')).toBeTruthy()

    wrapper.findAll('button').at(1).trigger('click')
    expect(wrapper.emitted().gamecompleted).toBeTruthy()
  })

  test('emits a exit when the user presses the back button', () => {
    wrapper.findAll('button').at(0).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
