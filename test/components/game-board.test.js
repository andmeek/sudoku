import { mount } from '@vue/test-utils'
import GameBoard from '../../src/components/game-board.vue'

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

  test('highlights the current input for completed tiles', () => {
    wrapper.setData({currentInput: '1'})

    expect(wrapper.findAll('.current-input').length).toEqual(5)
  })

  describe('.currentInput change', () => {
    let tileClick = jest.fn(), nonMockedTileClick = null

    beforeEach(() => {
      nonMockedTileClick = wrapper.vm.tileClick
      wrapper.vm.tileClick = tileClick
    })

    test('calls .tileClick for the selected tile', () => {
      var tile = board.tiles[4]

      wrapper.setData({selectedTile: tile})
      wrapper.setData({currentInput: 2})

      expect(tileClick).toBeCalledWith(board.tiles[4])
    })

    test('does not call .tileClick if there is no selected tile', () => {
      wrapper.setData({currentInput: 2})

      expect(tileClick).not.toBeCalled()
    })

    test('keeps the same tile selected', () => {
      wrapper.vm.tileClick = nonMockedTileClick
      wrapper.setData({selectedTile: board.tiles[4]})
      wrapper.setData({currentInput: 2})

      expect(wrapper.vm.selectedTile).toEqual(board.tiles[4])
    })
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

    test('unselects the tile and currentInput if the number was completed', () => {
      var lastTile = board.tileAt(0, 2)
      wrapper.setData({currentInput: 1})

      board.tiles.forEach((tile) => {
        if(tile.actualValue == 1 && lastTile.id != tile.id)
          tile.userValue = tile.actualValue
      })

      wrapper.vm.tileClick(lastTile)

      expect(wrapper.vm.selectedTile).toBeNull()
      expect(wrapper.vm.currentInput).toBeNull()
    })

    describe('grid updates', () => {
      var tile

      beforeEach(() => {
        wrapper.setData({currentInput: 2})
        tile = board.tiles[3]

        expect(tile.actualValue).toEqual(2)
      })

      test('when completed, it sets the grid state to userCompleted', () => {
        expect(board.grid.state(tile.x, tile.y)).toEqual(1)
        wrapper.vm.tileClick(tile)

        expect(board.grid.state(tile.x, tile.y)).toEqual(2)
      })

      test('when in error, it does nothing to the grid state', () => {
        wrapper.setData({currentInput: 1})

        wrapper.vm.tileClick(tile)
        expect(board.grid.state(tile.x, tile.y)).toEqual(1)
      })
    })
  })
})
