import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'
import Home from '../src/screens/home.vue'
import Game from '../src/screens/game.vue'

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

  test('shows the game newgame is called', () => {
    wrapper.vm.newgame()

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
