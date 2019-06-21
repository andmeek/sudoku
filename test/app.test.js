import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'
import Home from '../src/screens/home.vue'
import Game from '../src/screens/game.vue'

describe('App.vue', () => {
  let app 

  beforeEach(() => {
    app = shallowMount(App)
  })

  test('defaults to the home screen', () => {
    expect(app.is(App)).toBeTruthy()
    expect(app.vm.screen).toEqual('home');
    expect(app.contains(Home)).toBeTruthy()
  })

  test('matches snapshot', () => {
    expect(app.html()).toMatchSnapshot()
  })

  test('shows the game newgame is called', () => {
    app.vm.newgame()

    expect(app.vm.screen).toEqual('game')
    expect(app.contains(Game)).toBeTruthy()
    expect(app.html()).toMatchSnapshot()
  })
})
