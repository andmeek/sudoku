import { mount } from '@vue/test-utils'
import GameBoard from '../../src/components/game-board.vue'

describe('GameBoard.vue', () => {
  let wrapper, game, vm

  beforeEach(() => {
    game = genTestGame()

    wrapper = mount(GameBoard, {
      propsData: {
        game: game
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

  describe('.inputChanged', () => {
    let tileClick = jest.fn(), nonMockedTileClick = null

    beforeEach(() => {
      nonMockedTileClick = wrapper.vm.tileClick
      wrapper.vm.tileClick = tileClick
    })

    test('calls .tileClick for the selected tile', () => {
      var tile =  game.board.tiles[4]

      game.currentInput = 2
      wrapper.setData({selectedTile: tile})

      wrapper.vm.inputChanged()

      expect(tileClick).toBeCalledWith(game.board.tiles[4])
    })

    test('does not call .tileClick if there is no selected tile', () => {
      game.currentInput = 2

      wrapper.vm.inputChanged()

      expect(tileClick).not.toBeCalled()
    })

    test('keeps the same tile selected', () => {
      wrapper.vm.tileClick = nonMockedTileClick
      wrapper.setData({selectedTile: game.board.tiles[4]})
      game.currentInput = 2

      wrapper.vm.inputChanged()

      expect(wrapper.vm.selectedTile).toEqual(game.board.tiles[4])
    })
  })

  describe('.tileClick', () => {
    test('updates the tile to selected when clicked', () => {
      wrapper.vm.tileClick(game.board.tiles[0])

      expect(wrapper.vm.selectedTile).toEqual(game.board.tiles[0])
      expect(wrapper.find('.selected').is('div')).toBeTruthy()
    })

    test('unsets the selected tile if its clicked again', () => {
      wrapper.vm.tileClick(game.board.tiles[0])

      expect(wrapper.vm.selectedTile).toEqual(game.board.tiles[0])

      wrapper.vm.tileClick(game.board.tiles[0])

      expect(wrapper.vm.selectedTile).toBeNull()
    })

    test('highlights the siblings of the selected', () => {
      wrapper.vm.tileClick(game.board.tiles[0])

      expect(wrapper.findAll('.selected-sibling').length).toEqual(16)
    })

    test('sets the tile value when an input is selected', () => {
      game.currentInput = 1
      expect(game.board.tiles[3].userValue).toBeNull()

      wrapper.vm.tileClick(game.board.tiles[3])

      expect(game.board.tiles[3].userValue).toEqual(1)
    })

    test('erases the tile if the input is "0"', () => {
      game.currentInput = 0
      game.board.tiles[3].userValue = 3

      wrapper.vm.tileClick(game.board.tiles[3])
      expect(game.board.tiles[3].userValue).toBeNull()
    })

    test('unsets the tile user value if clicked again with the same input', () => {
      game.currentInput = 1
      wrapper.vm.tileClick(game.board.tiles[3])

      expect(game.board.tiles[3].userValue).toEqual(1)

      wrapper.vm.tileClick(game.board.tiles[3])
      expect(game.board.tiles[3].userValue).toBeNull()
    })

    test('toggles the user draft if pencil mode is true', () => {
      game.currentInput = 1
      game.draftMode = true
      wrapper.vm.tileClick(game.board.tiles[3])

      expect(game.board.tiles[3].userDrafts).toContain(1)
      expect(game.board.tiles[3].userValue).toBeNull()

      wrapper.vm.tileClick(game.board.tiles[3])
      expect(game.board.tiles[3].userDrafts).not.toContain(1)
      expect(game.board.tiles[3].userValue).toBeNull()
    })

    test('unselects the tile and currentInput if the number was completed', () => {
      var lastTile = game.board.tileAt(0, 2)
      game.currentInput = 1

      completeNumber(game, 1)

      wrapper.vm.tileClick(lastTile)

      expect(wrapper.vm.selectedTile).toBeNull()
    })

    describe('grid updates', () => {
      var tile

      beforeEach(() => {
        game.currentInput = 2
        tile = game.board.tiles[3]

        expect(tile.actualValue).toEqual(2)
      })

      test('when completed, it sets the grid state to userCompleted', () => {
        expect(game.board.grid.state(tile.x, tile.y)).toEqual(1)
        wrapper.vm.tileClick(tile)

        expect(game.board.grid.state(tile.x, tile.y)).toEqual(2)
      })

      test('when in error, it does nothing to the grid state', () => {
        game.currentInput = 1

        wrapper.vm.tileClick(tile)
        expect(game.board.grid.state(tile.x, tile.y)).toEqual(1)
      })
    })

    describe('.updatePotentialValues', () => {
      test('updates all the childrens potential values', () => {
        wrapper.vm.updatePotentialValues()

        wrapper.vm.$children.forEach((tile) => {
          expect(tile.potentialValues.length).toBeGreaterThan(0)
        })
      })
    })
  })
})
