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

  test('emits an "newgame" event when the user clicks back', () => {
    wrapper.find('button').trigger('click')

    expect(wrapper.emitted()['new-game']).toBeTruthy()
  })
})
