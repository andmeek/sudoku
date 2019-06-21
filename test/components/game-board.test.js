import { shallowMount } from '@vue/test-utils'
import GameBoard from '../../src/components/game-board.vue'

describe('GameBoard.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GameBoard, {
      propsData: {
        board: genTestBoard()
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
