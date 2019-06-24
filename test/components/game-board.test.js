import { mount } from '@vue/test-utils'
import GameBoard from '../../src/components/game-board.vue'
import Tile from '../../src/models/tile.js'
import { TEST_BOARD } from '../variables.js'

describe('GameBoard.vue', () => {
  let wrapper, board, vm

  beforeEach(() => {
    board = genTestBoard()

    wrapper = mount(GameBoard, {
      propsData: {
        board: board
      }
    })

    vm = wrapper.vm
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('tiles are in the correct order', () => {
    let vals = vm.$children.map((c) => c.tile.actualValue)

    expect(vals).toEqual([
        4, 3, 5, 6, 8, 2, 1, 9, 7,
        2, 6, 9, 5, 7, 1, 8, 3, 4,
        7, 8, 1, 4, 9, 3, 5, 6, 2,
        8, 2, 6, 3, 7, 4, 9, 5, 1,
        1, 9, 5, 6, 8, 2, 7, 4, 3,
        3, 4, 7, 9, 1, 5, 6, 2, 8,
        5, 1, 9, 2, 4, 8, 7, 6, 3,
        3, 2, 6, 9, 5, 7, 4, 1, 8,
        8, 7, 4, 1, 3, 6, 2, 5, 9
    ])
  })

  test('highlights the current input', () => {
    wrapper.setData({currentInput: '1'})

    expect(wrapper.findAll('.current-input').length).toEqual(9)
  })

  describe('.tileClick', () => {
    test('updates the tile to selected when clicked', () => {
      wrapper.vm.tileClick(board.tiles[0])

      expect(wrapper.vm.selectedTile).toEqual(board.tiles[0])
      expect(wrapper.find('.selected').is('div')).toBeTruthy()
    })

    test('unsets the selected tile if its clicked again', () => {
      wrapper.vm.tileClick(board.tiles[0])

      expect(wrapper.vm.selectedTile).toEqual(board.tiles[0])

      wrapper.vm.tileClick(board.tiles[0])

      expect(wrapper.vm.selectedTile).toBeNull()
    })

    test('highlights the siblings of the selected', () => {
      wrapper.vm.tileClick(board.tiles[0])

      expect(wrapper.findAll('.selected-sibling').length).toEqual(16)
    })

    test('sets the tile value when an input is selected', () => {
      wrapper.setData({currentInput: 1})
      expect(board.tiles[3].userValue).toBeNull()

      wrapper.vm.tileClick(board.tiles[3])

      expect(board.tiles[3].userValue).toEqual(1)
    })

    test('erases the tile if the input is "0"', () => {
      wrapper.setData({currentInput: 0})
      board.tiles[3].userValue = 3

      wrapper.vm.tileClick(board.tiles[3])
      expect(board.tiles[3].userValue).toBeNull()
    })

    test('unsets the tile user value if clicked again with the same input', () => {
      wrapper.setData({currentInput: 1})
      wrapper.vm.tileClick(board.tiles[3])

      expect(board.tiles[3].userValue).toEqual(1)

      wrapper.vm.tileClick(board.tiles[3])
      expect(board.tiles[3].userValue).toBeNull()
    })

    test('toggles the user draft if pencil mode is true', () => {
      wrapper.setData({currentInput: 1, pencil: true})
      wrapper.vm.tileClick(board.tiles[3])

      expect(board.tiles[3].userDrafts).toContain(1)
      expect(board.tiles[3].userValue).toBeNull()

      wrapper.vm.tileClick(board.tiles[3])
      expect(board.tiles[3].userDrafts).not.toContain(1)
      expect(board.tiles[3].userValue).toBeNull()
    })
  })
})
