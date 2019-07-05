<template>
  <div id="game">
    <home-screen v-if="screen == 'home'" v-on:new-game="play"></home-screen>
    <difficulty-screen v-if="screen == 'difficulty'" v-on:difficultyselected="newgame" v-on:exit="home"></difficulty-screen>
    <game-screen v-bind:board="board" v-if="screen == 'game'" v-on:exit="home" v-on:gamecompleted="gameover"></game-screen>
  </div>
</template>

<script>
import DifficultyScreen from './screens/difficulty-select.vue'
import HomeScreen from './screens/home.vue'
import GameScreen from './screens/game.vue'

export default {
  data() {
    return {
      screen: 'home',
      board: null
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
    newgame: function(difficulty) {
      this.board = newboard(difficulty, Math.floor(Math.random() * 25000))
      this.screen = 'game'
    },
    gameover: function() {
      this.board = null
      this.screen = 'home'
    },
  },
  components: {
    DifficultyScreen, HomeScreen, GameScreen
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
