import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  test('defaults to the home screen', () => {
    expect(wrapper.vm.screen).toEqual('home')
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('shows the diffuculty select when play is called', () => {
    wrapper.vm.play()

    expect(wrapper.vm.screen).toEqual('difficulty')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('shows the stats screen when stats is called', () => {
    wrapper.vm.stats()

    expect(wrapper.vm.screen).toEqual('stats')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('returns to the home screen when receving an exit', () => {
    wrapper.vm.home()

    expect(wrapper.vm.screen).toEqual('home')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('shows the game screen when newgame is called', () => {
    wrapper.vm.newgame(10, 'Easy')

    expect(wrapper.vm.screen).toEqual('game')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('when the game is completed it goes back to home', () => {
    wrapper.vm.gameover()

    expect(wrapper.vm.screen).toEqual('home')
  })
})
