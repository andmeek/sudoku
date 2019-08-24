import { shallowMount } from '@vue/test-utils'
import GameHeader from '../../src/components/game-header.vue'

describe('GameHeader.vue', () => {
  let wrapper, board = genTestBoard()

  beforeEach(() => {
    wrapper = shallowMount(GameHeader, {
      propsData: {
        board: board,
        difficulty: 'Easy',
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits an exit when the user presses the exit button', () => {
    wrapper.findAll('button').at(0).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
