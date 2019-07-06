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

  test('converts the board timer to a clock format', () => {
    expect(board.timer).toEqual(0)
    expect(wrapper.find('.timer').text()).toEqual('00:00:00')

    const localThis = {board: board}
    board.timer = 59
    expect(GameHeader.computed.time.call(localThis)).toEqual('00:00:59')

    board.timer = 5200
    expect(GameHeader.computed.time.call(localThis)).toEqual('01:26:40')
  })

  test('emits an exit when the user presses the exit button', () => {
    wrapper.findAll('button').at(0).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
