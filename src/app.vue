<template>
  <div id="game">
    <home-screen v-if="screen == 'home'" v-on:new-game="newgame"></home-screen>
    <game-screen v-bind:board="board" v-if="screen == 'game'" v-on:gamecompleted="gameover"></game-screen>
  </div>
</template>

<script>
import HomeScreen from './screens/home.vue'
import GameScreen from './screens/game.vue'
import Board from './models/board.js'
import {TEST_BOARD, TEST_BOARD_STATE} from '../test/variables.js'

export default {
  data() {
    return {
      screen: "home",
      board: null
    }
  },
  methods: {
    newgame: function(event) {
      this.board = new Board(TEST_BOARD, TEST_BOARD_STATE)
      this.screen = 'game'
    },
    gameover: function() {
      this.board = null
      this.screen = 'home'
    },
  },
  components: {
    HomeScreen, GameScreen
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
