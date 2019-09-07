<template>
  <div id="game">
    <home-screen
      v-if="screen == 'home'"
      @new-game="play"
      @stats="stats"
    />
    <stats-screen
      v-if="screen == 'stats'"
      @exit="home"
    />
    <difficulty-screen
      v-if="screen == 'difficulty'"
      @difficultyselected="newgame"
      @exit="home"
    />
    <game-screen
      v-if="screen == 'game'"
      :game="game"
      @exit="home"
      @gamecompleted="gameover"
    />
  </div>
</template>

<script>
import Board from './models/board.js'
import DifficultyScreen from './screens/difficulty-select.vue'
import Game from './models/game.js'
import GameScreen from './screens/game.vue'
import Generate from './models/generate.js'
import HomeScreen from './screens/home.vue'
import StatsScreen from './screens/stats.vue'

export default {
  components: {
    DifficultyScreen, HomeScreen, GameScreen, StatsScreen
  },
  data () {
    return {
      game: null,
      screen: 'home'
    }
  },
  methods: {
    home: function () {
      this.board = null
      this.screen = 'home'
    },
    play: function () {
      this.screen = 'difficulty'
    },
    newgame: function (difficulty, difficultyDisplay) {
      this.game = new Game()
      this.game.seed = Math.floor(Math.random() * 25000)
      this.game.difficulty = difficultyDisplay

      const grid = Generate.board(this.game.seed)
      Generate.boardState(grid, difficulty)

      this.game.board = new Board(grid)
      this.screen = 'game'
    },
    gameover: function () {
      this.game = null
      this.screen = 'home'
    },
    stats: function () {
      this.screen = 'stats'
    }
  }
}
</script>

<style>
.screen {
  margin: 0 auto;
  max-width: 550px;
}

@media screen and (max-width: 1020px) {
  .screen {
    font-size: 0.9em;
    max-width: 100%;
    padding: 10px;
  }
}
</style>
