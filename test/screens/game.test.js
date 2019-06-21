import { shallowMount } from '@vue/test-utils'
import Game from '../../src/screens/game.vue'

describe('Game.vue', () => {
  let game

  beforeEach(() => {
    game = shallowMount(Game, {
      propsData: {
        board: genTestBoard()
      }
    })
  })

  test('matches snapshot', () => {
    expect(game.html()).toMatchSnapshot() 
  })
})
