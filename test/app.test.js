import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'
import Home from '../src/screens/home.vue'
import Game from '../src/screens/game.vue'
import Difficulty from '../src/screens/difficulty-select.vue'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  test('defaults to the home screen', () => {
    expect(wrapper.is(App)).toBeTruthy()
    expect(wrapper.vm.screen).toEqual('home');
    expect(wrapper.contains(Home)).toBeTruthy()
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('shows the diffuculty select when play is called', () => {
    wrapper.vm.play()

    expect(wrapper.vm.screen).toEqual('difficulty')
    expect(wrapper.contains(Difficulty)).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('returns to the home screen when receving an exit', () => {
    wrapper.vm.home()

    expect(wrapper.vm.screen).toEqual('home');
    expect(wrapper.contains(Home)).toBeTruthy()
  })

  test('shows the game screen when newgame is called', () => {
    wrapper.vm.newgame(10, 'Easy')

    expect(wrapper.vm.screen).toEqual('game')
    expect(wrapper.contains(Game)).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('when the game is completed it goes back to home', () => {
    wrapper.vm.gameover()

    expect(wrapper.vm.screen).toEqual('home')
    expect(wrapper.contains(Home)).toBeTruthy()
  })
})
