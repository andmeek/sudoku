import Database from '../../src/database.js'
import Stats from '../../src/screens/stats.vue'
import { shallowMount } from '@vue/test-utils'

async function loadPlaysData () {
  var completedGame1 = genTestGame()
  var completedGame2 = genTestGame()
  var incompleteGame = genTestGame()
  completeBoard(completedGame1.board)
  completeBoard(completedGame2.board)

  incompleteGame.difficulty = 'Medium'

  completedGame2.timer = 123
  completedGame2.difficulty = 'Hard'

  await Database.recordGame(genTestGame())
  await Database.recordGame(incompleteGame)
  await Database.recordGame(completedGame1)
  await Database.recordGame(completedGame2)
}

describe('Stats.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Stats)
  })

  afterEach(async () => {
    await clearDatabase()
  })

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('matches snapshot with game plays stats', () => {
    wrapper.setData({
      stats: {
        Easy: { plays: 20, besttime: 123, completed: 2 },
        Medium: null,
        Hard: { plays: 2, besttime: 123122, completed: 1 },
        'Very Hard': { plays: 1, besttime: null, completed: 0 },
        Insane: null,
        Unthinkable: null
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('matches snapshot with game play history', () => {
    wrapper.setData({
      plays: [
        { date: 1567742786306, difficulty: 'Hard', completed: true, timer: 123098098, mistakes: 0 },
        { date: 12345, difficulty: 'Easy', completed: false, timer: 20, mistakes: 2 }
      ]
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('emits an exit event when the user clicks back', () => {
    wrapper.find({ ref: 'exit' }).trigger('click')

    expect(wrapper.emitted().exit).toBeTruthy()
  })

  describe('.loadPlays', () => {
    test('sets the plays array to empty by default', () => {
      wrapper.vm.loadPlays()

      expect(wrapper.vm.plays).toEqual([])
    })

    test('loads the plays from the database when set', async () => {
      await loadPlaysData()

      await wrapper.vm.loadPlays()

      expect(wrapper.vm.plays.length).toEqual(4)
    })

    test('sorts the plays by descending', async () => {
      await loadPlaysData()

      await wrapper.vm.loadPlays()

      expect(wrapper.vm.plays[0].difficulty).toEqual('Hard')
      expect(wrapper.vm.plays[1].difficulty).toEqual('Easy')
      expect(wrapper.vm.plays[2].difficulty).toEqual('Medium')
      expect(wrapper.vm.plays[3].difficulty).toEqual('Easy')
    })
  })

  describe('.loadStats', () => {
    test('doesnt change the stats if there is no data', async () => {
      await wrapper.vm.loadStats()

      expect(wrapper.vm.stats).toEqual({
        Easy: null,
        Medium: null,
        Hard: null,
        'Very Hard': null,
        Insane: null,
        Unthinkable: null
      })
    })

    test('calculates the stats from the plays when set', async () => {
      await loadPlaysData()

      await wrapper.vm.loadStats()

      expect(wrapper.vm.plays.length).toEqual(4)
      expect(wrapper.vm.stats).toEqual({
        Easy: { plays: 2, besttime: 0, completed: 1 },
        Medium: { plays: 1, besttime: null, completed: 0 },
        Hard: { plays: 1, besttime: 123, completed: 1 },
        'Very Hard': null,
        Insane: null,
        Unthinkable: null
      })
    })
  })
})
