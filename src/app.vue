<template>
  <div id="game">
    <home-screen v-if="screen == 'home'" v-on:new-game="newgame"></home-screen>
    <game-screen v-bind:board="board" v-if="screen == 'game'"></game-screen>
  </div>
</template>

<script>
import HomeScreen from './screens/home.vue'
import GameScreen from './screens/game.vue'
import { TEST_BOARD, TEST_BOARD_STATE } from './variables.js'
import Board from './models/board.js'

export default {
  data() {
    return {
      screen: "game",
      board: new Board(TEST_BOARD, TEST_BOARD_STATE)
    }
  },
  methods: {
    newgame: function(event) {
      this.board = null
      this.screen = "game"
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
  max-width: 450px;
}
</style>
