import { shallowMount } from '@vue/test-utils'
import Home from '../../src/screens/home.vue'

describe('Home.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Home)
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits an "newgame" event when the user clicks new game', () => {
    wrapper.find({ ref: 'newgame' }).trigger('click')

    expect(wrapper.emitted()['new-game']).toBeTruthy()
  })

  test('emits an "stats" event when the user clicks stats', () => {
    wrapper.setData({ showStats: true })
    wrapper.find({ ref: 'stats' }).trigger('click')

    expect(wrapper.emitted().stats).toBeTruthy()
  })

  test('enables the stats button when showStats is enabled', async () => {
    wrapper.setData({ showStats: true })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
