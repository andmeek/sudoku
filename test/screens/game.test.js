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

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().gamecompleted).toBeTruthy()
  })
})
