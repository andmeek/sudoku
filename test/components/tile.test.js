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

  test('renders the draft values if set and no user value', () => {
    tile.userValue = null
    tile.userDrafts = [3, 2, 1]
    wrapper.vm.$forceUpdate()
    const spans = wrapper.find('.draft-values').findAll('span')

    expect(spans.at(1).text()).toEqual("1")
    expect(spans.at(2).text()).toEqual("2")
    expect(spans.at(3).text()).toEqual("3")
  })

  test('emits a "tileclick" event when the tile is clicked', () => {
    wrapper.find('div').trigger('click')

    expect(wrapper.emitted().tileclick).toBeTruthy()
    expect(wrapper.emitted().tileclick[0]).toEqual([tile])
  })

  test('emits a "tilefocus" event when the tile is hovered', () => {
    wrapper.find('div').trigger('mouseover')

    expect(wrapper.emitted().tilefocus).toBeTruthy()
    expect(wrapper.emitted().tilefocus[0]).toEqual([tile])
  })

  test('emits a "tilefocus" event with a null tile when the mouse leaves it', () => {
    wrapper.find('div').trigger('mouseout')

    expect(wrapper.emitted().tilefocus).toBeTruthy()
    expect(wrapper.emitted().tilefocus[0]).toEqual([null])
  })

  test('adds css classes based upon the data state', () => {
    tile.userValue = tile.actualValue + 1

    wrapper.setProps({selected: true, selectedSibling: true, currentInput: true})
    let div = wrapper.find('div')

    expect(div.classes()).toContain('selected')
    expect(div.classes()).toContain('selected-sibling')
    expect(div.classes()).toContain('current-input')
    expect(div.classes()).toContain('error')
  })
})
