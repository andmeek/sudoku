import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'
import Home from '../src/screens/home.vue'
import Game from '../src/screens/game.vue'

describe('App.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = shallowMount(App)
  })

  test('defaults to the home screen', () => {
    expect(cmp.is(App)).toBeTruthy()
    expect(cmp.vm.screen).toEqual('home');
    expect(cmp.contains(Home)).toBeTruthy()
  })

  test('matches snapshot', () => {
    expect(cmp.html()).toMatchSnapshot()
  })

  test('shows the game newgame is called', () => {
    cmp.vm.newgame()

    expect(cmp.vm.screen).toEqual('game')
    expect(cmp.contains(Game)).toBeTruthy()
    expect(cmp.html()).toMatchSnapshot()
  })
})
