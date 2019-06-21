import { shallowMount } from '@vue/test-utils'
import Tile from '../../src/components/tile.vue'

describe('Tile.vue', () => {
  let wrapper
  var board, tile

  beforeEach(() => {
    board = genTestBoard()
    tile = board.tiles[0]
    tile.userEditable = true
    wrapper = shallowMount(Tile, {
      propsData: {
        board: board,
        tile: tile,
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders the real value when not user editable', () => {
    tile.userEditable = false
    wrapper.vm.$forceUpdate()

    expect(wrapper.find('span').text()).toEqual(tile.actualValue.toString())
  })

  test('renders the user value if set', () => {
    tile.userValue = tile.actualValue
    wrapper.vm.$forceUpdate()

    expect(wrapper.find('span').text()).toEqual(tile.actualValue.toString())
  })

  test('renders a non-blank space if no user value is set', () => {
    tile.userValue = null
    wrapper.vm.$forceUpdate()

    expect(wrapper.find('.user-value').text()).toEqual('')
  })
})
