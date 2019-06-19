<template>
  <div id="game">
    <home-screen v-if="screen == 'home'" v-on:new-game="newgame"></home-screen>
    <game-screen v-bind:board="board" v-if="screen == 'game'"></game-screen>
  </div>
</template>

<script>
import HomeScreen from './screens/home.vue'
import GameScreen from './screens/game.vue'

export default {
  data() {
    return {
      screen: "home",
      board: null
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
html, body {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  font-family: Helvetica;
}

button:focus { outline: 0; }

.screen {
  margin: 0 auto;
  max-width: 450px;
}
</style>
