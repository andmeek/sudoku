<template>
  <div id="game">
    <home-screen v-if="screen == 'home'" v-on:new-game="newgame"></home-screen>
    <game-screen v-bind:board="board" v-if="screen == 'game'" v-on:gamecompleted="gameover"></game-screen>
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
      this.board = newboard(0, 1, true)
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
