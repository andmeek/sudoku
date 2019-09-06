import Stats from '../../src/screens/stats.vue'
import { shallowMount } from '@vue/test-utils'

describe('Stats.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Stats)
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits an exit event when the user clicks back', () => {
    wrapper.find({ ref: 'exit' }).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
