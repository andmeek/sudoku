import DifficultySelect from '../../src/screens/difficulty-select.vue'
import { shallowMount } from '@vue/test-utils'

describe('DifficultySelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DifficultySelect)
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits a difficultyselected event when the user picks one', () => {
    wrapper.findAll('button').at(0).trigger('click')

    expect(wrapper.emitted().difficultyselected).toBeTruthy()
    expect(wrapper.emitted().difficultyselected[0]).toEqual([40, 'Easy'])

    wrapper.findAll('button').at(2).trigger('click')

    expect(wrapper.emitted().difficultyselected[1]).toEqual([60, 'Hard'])
  })

  test('emits an exit event when the user clicks back', () => {
    wrapper.findAll('button').at(4).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
