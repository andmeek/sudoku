import { createLocalVue, shallowMount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UserInput from '../../src/components/user-input.vue'

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('UserInput.vue', () => {
  let wrapper, game

  beforeEach(() => {
    game = genTestGame()
    wrapper = shallowMount(UserInput, {
      localVue,
      propsData: {
        game: game
      }
    })
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('toggles the selection if hit again', () => {
    expect(wrapper.find('.selected').exists()).toBeFalsy()

    Array.from(Array(10).keys()).forEach(function(val) {
      wrapper.find(`[value="${val}"]`).trigger('click')
      expect(wrapper.find('.selected').attributes('value')).toEqual(val.toString())

      wrapper.find(`[value="${val}"]`).trigger('click')
      expect(wrapper.find('.selected').exists()).toBeFalsy()
    })
  })

  test('disables completed numbers', () => {
    completeNumber(game, 1)

    wrapper.vm.$forceUpdate()
    expect(game.board.numberCompleted('1')).toBeTruthy()
    expect(wrapper.find('.disabled').attributes('value')).toEqual('1')
    expect(wrapper.find('.disabled').attributes('disabled')).toEqual('disabled')

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.vm.current).toBeNull()
  })

  test('unselects completed numbers if selected', () => {
    wrapper.find('[value="1"]').trigger('click')
    expect(wrapper.find('.selected').exists()).toBeTruthy()

    completeNumber(game, 1)

    wrapper.vm.$forceUpdate()
    expect(wrapper.find('.selected').exists()).toBeFalsy()
  })

  test('highlights the current selection', () => {
    wrapper.find('[value="1"]').trigger('click')

    expect(wrapper.find('.selected').attributes('value')).toEqual('1')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('changes the game current input to the selected', () => {
    expect(game.currentInput).toBeNull()

    wrapper.find('[value="1"]').trigger('click')

    expect(game.currentInput).toEqual(1)
  })

  describe('pencil mode', () => {
    test('highlights the pencil when in draft mode and another selection', () => {
      wrapper.find('[value="1"]').trigger('click')
      wrapper.find('[value="pencil"]').trigger('click')

      expect(wrapper.find('[value="1"]').classes()).toContain('selected')
      expect(wrapper.find('[value="pencil"]').classes()).toContain('selected')
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('toggles the game state draftMode', () => {
      expect(game.draftMode).toBeFalsy()

      wrapper.find('[value="pencil"]').trigger('click')
      expect(game.draftMode).toBeTruthy()

      wrapper.find('[value="pencil"]').trigger('click')
      expect(game.draftMode).toBeFalsy()
    })
  })

  describe('show all notes', () => {
    test('toggles the selected class on and off', () => {
      wrapper.find('[value="all-notes"]').trigger('click')

      expect(wrapper.find('[value="all-notes"]').classes()).toContain('selected')

      wrapper.find('[value="all-notes"]').trigger('click')

      expect(wrapper.find('[value="all-notes"]').classes()).not.toContain('selected')
    })

    test('toggles the game state', () => {
      expect(game.showAllNotes).toBeFalsy()

      wrapper.find('[value="all-notes"]').trigger('click')

      expect(game.showAllNotes).toBeTruthy()
      wrapper.find('[value="all-notes"]').trigger('click')

      expect(game.showAllNotes).toBeFalsy()
    })
  })
})
