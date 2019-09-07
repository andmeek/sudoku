<template>
  <div id="game">
    <home-screen
      v-if="screen == 'home'"
      v-on:new-game="play"
      v-on:stats="stats"
    ></home-screen>
    <stats-screen v-if="screen == 'stats'" v-on:exit="home"></stats-screen>
    <difficulty-screen v-if="screen == 'difficulty'" v-on:difficultyselected="newgame" v-on:exit="home"></difficulty-screen>
    <game-screen
      v-bind:game="game"
      v-if="screen == 'game'"
      v-on:exit="home"
      v-on:gamecompleted="gameover"></game-screen>
  </div>
</template>

<script>
import Board from './models/board.js'
import DifficultyScreen from './screens/difficulty-select.vue'
import Game from './models/game.js'
import GameScreen from './screens/game.vue'
import Generate from './models/generate.js'
import Grid from './models/grid.js'
import HomeScreen from './screens/home.vue'
import StatsScreen from './screens/stats.vue'

export default {
  data() {
    return {
      game: null,
      screen: 'home',
    }
  },
  methods: {
    home: function() {
      this.board = null
      this.screen = 'home'
    },
    play: function() {
      this.screen = 'difficulty'
    },
    newgame: function(difficulty, difficultyDisplay) {
      this.game = new Game()
      this.game.seed = Math.floor(Math.random() * 25000)
      this.game.difficulty = difficultyDisplay

      const grid = Generate.board(this.game.seed)
      Generate.boardState(grid, difficulty)

      this.game.board = new Board(grid)
      this.screen = 'game'
    },
    gameover: function() {
      this.game = null
      this.screen = 'home'
    },
    stats: function() {
      this.screen = 'stats'
    },
  },
  components: {
    DifficultyScreen, HomeScreen, GameScreen, StatsScreen
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
