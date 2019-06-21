import { shallowMount } from '@vue/test-utils'
import UserInput from '../../src/components/user-input.vue'

describe('UserInput.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserInput, {
      propsData: {
        board: genTestBoard()
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.find("[value='0']").text()).toEqual('Erase')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('toggles the selection if hit again', () => {
    expect(wrapper.find('.selected').exists()).toBeFalsy()

    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').attributes('value')).toEqual('1')

    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').exists()).toBeFalsy()
  })

  test('disabled completed numbers', () => {
    wrapper.vm.board.tiles.forEach((tile) => {
      if(tile.actualValue == 1)
        tile.userValue = tile.actualValue
    })

    wrapper.vm.$forceUpdate()
    expect(wrapper.vm.board.numberCompleted('1')).toBeTruthy()
    expect(wrapper.find('.disabled').attributes('value')).toEqual('1')
    expect(wrapper.find('.disabled').attributes('disabled')).toEqual('disabled')

    expect(wrapper.html()).toMatchSnapshot()
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

    expect(wrapper.find('.selected:first-of-type').attributes('value')).toEqual('1')
    expect(wrapper.find('.selected:last-of-type').text()).toEqual('Pencil')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
