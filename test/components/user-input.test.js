import { createLocalVue, shallowMount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UserInput from '../../src/components/user-input.vue'

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('UserInput.vue', () => {
  let wrapper, board

  beforeEach(() => {
    board = genTestBoard()
    wrapper = shallowMount(UserInput, {
      localVue,
      propsData: {
        board: board
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('toggles the selection if hit again', () => {
    expect(wrapper.find('.selected').exists()).toBeFalsy()

    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').attributes('value')).toEqual('1')

    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').exists()).toBeFalsy()
  })

  test('disables completed numbers', () => {
    board.tiles.forEach((tile) => {
      if(tile.actualValue == 1)
        tile.userValue = tile.actualValue
    })

    wrapper.vm.$forceUpdate()
    expect(board.numberCompleted('1')).toBeTruthy()
    expect(wrapper.find('.disabled').attributes('value')).toEqual('1')
    expect(wrapper.find('.disabled').attributes('disabled')).toEqual('disabled')

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.vm.current).toBeNull()
  })

  test('unselects completed numbers if selected', () => {
    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').exists()).toBeTruthy()

    board.tiles.forEach((tile) => {
      if(tile.actualValue == 1)
        tile.userValue = tile.actualValue
    })

    wrapper.vm.$forceUpdate()
    expect(wrapper.find('.selected').exists()).toBeFalsy()
    expect(wrapper.emitted().inputchanged).toBeTruthy()
  })

  test('highlights the current selection', () => {
    wrapper.find('[value="1"]').trigger('click')

    expect(wrapper.find('.selected').attributes('value')).toEqual('1')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits an `inputchanged` event when the selection changed', () => {
    wrapper.find('[value="1"]').trigger('click')

    expect(wrapper.emitted().inputchanged).toBeTruthy()
    expect(wrapper.emitted().inputchanged[0]).toEqual([1, false])
  })

  describe('pencil mode', () => {
    test('emits an `inputchanged` event with pencil mode if set', () => {
      wrapper.find('[value="1"]').trigger('click')
      wrapper.find('[value="pencil"]').trigger('click')

      expect(wrapper.emitted().inputchanged.length).toEqual(2)
      expect(wrapper.emitted().inputchanged[0]).toEqual([1, false])
      expect(wrapper.emitted().inputchanged[1]).toEqual([1, true])
    })

    test('highlights the pencil when in draft mode and another selection', () => {
      wrapper.find('[value="1"]').trigger('click')
      wrapper.find('[value="pencil"]').trigger('click')

      expect(wrapper.find('[value="1"]').classes()).toContain('selected')
      expect(wrapper.find('[value="pencil"]').classes()).toContain('selected')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('show all notes', () => {
    test('toggles the selected class on and off', () => {
      wrapper.find('[value="all-notes"]').trigger('click')

      expect(wrapper.find('[value="all-notes"]').classes()).toContain('selected')

      wrapper.find('[value="all-notes"]').trigger('click')

      expect(wrapper.find('[value="all-notes"]').classes()).not.toContain('selected')
    })

    test('emites an `showallnotes` event with true then false when clicked twice', () => {
      wrapper.find('[value="all-notes"]').trigger('click')
      wrapper.find('[value="all-notes"]').trigger('click')

      expect(wrapper.emitted().showallnotes.length).toEqual(2)
      expect(wrapper.emitted().showallnotes[0]).toEqual([true])
      expect(wrapper.emitted().showallnotes[1]).toEqual([false])
    })
  })
})
