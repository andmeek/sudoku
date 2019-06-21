import { shallowMount } from '@vue/test-utils'
import Tile from '../../src/components/tile.vue'

describe('Tile.vue', () => {
  let wrapper

  beforeEach(() => {
    var board = genTestBoard()
    wrapper = shallowMount(Tile, {
      propsData: {
        board: board,
        tile: board.tiles[0],
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
