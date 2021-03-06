import { shallowMount } from '@vue/test-utils'
import Tile from '../../src/components/tile.vue'

describe('Tile.vue', () => {
  let wrapper
  var game, tile

  beforeEach(() => {
    game = genTestGame()
    tile = game.board.tiles[0]
    tile.userEditable = true
    wrapper = shallowMount(Tile, {
      propsData: {
        game: game,
        tile: tile
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

    expect(spans.at(0).text()).toEqual('1')
    expect(spans.at(1).text()).toEqual('2')
    expect(spans.at(2).text()).toEqual('3')
  })

  test('renders the potential values if showing all notes, user editable, and not completed', () => {
    tile.userEditable = true
    tile.userValue = null
    game.showAllNotes = true

    wrapper.setData({ potentialValues: [1, 6] })
    wrapper.vm.$forceUpdate()

    const spans = wrapper.find('.potential-values').findAll('span')

    expect(spans.at(1).text()).toEqual('1')
    expect(spans.at(2).text()).toEqual('6')
  })

  test('renders the value when it is being shown as a hint', () => {
    game.hintTile = tile
    wrapper.vm.$forceUpdate()

    expect(wrapper.html()).toMatchSnapshot()
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

    wrapper.setProps({ selected: true, selectedSibling: true })
    const div = wrapper.find('div')

    expect(div.classes()).toContain('selected')
    expect(div.classes()).toContain('selected-sibling')
    expect(div.classes()).not.toContain('current-input')
    expect(div.classes()).toContain('error')
  })

  describe('.currentInput', () => {
    test('is false by default', () => {
      expect(Tile.computed.currentInput.call(wrapper.vm)).toBeFalsy()
    })

    test('is true when completed and matching the games current user input', () => {
      tile.userEditable = false
      game.currentInput = tile.actualValue

      expect(tile.completed).toBeTruthy()
      expect(Tile.computed.currentInput.call(wrapper.vm)).toBeTruthy()
    })

    test('is true when user completed and matching the games current user input', () => {
      tile.userEditable = true
      tile.userValue = tile.actualValue
      game.currentInput = tile.actualValue

      expect(Tile.computed.currentInput.call(wrapper.vm)).toBeTruthy()
    })
  })

  describe('.updatePotentialValues', () => {
    test('sets the potentialValues data', () => {
      wrapper.setData({ potentialValues: [] })

      wrapper.vm.updatePotentialValues()

      expect(wrapper.vm.potentialValues).toEqual([1, 6])
    })
  })
})
