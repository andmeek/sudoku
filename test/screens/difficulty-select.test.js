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
    wrapper.find('[value="5"]').trigger('click')

    expect(wrapper.emitted().difficultyselected).toBeTruthy()
    expect(wrapper.emitted().difficultyselected[0]).toEqual([5])

    wrapper.find('[value="20"]').trigger('click')

    expect(wrapper.emitted().difficultyselected[1]).toEqual([20])
  })

  test('emits an exit event when the user clicks back', () => {
    wrapper.findAll('button').at(4).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })
})
