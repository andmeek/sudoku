<template>
  <div class="home screen">
    <h1>Play Sudoku</h1>

    <div class="actions">
      <button
        ref="newgame"
        class="menu"
        @click="newgame"
      >
        New Game
      </button>
      <button
        ref="stats"
        :disabled="!showStats"
        class="menu"
        @click="stats"
      >
        Stats
      </button>
      <a
        class="menu"
        href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
        target="_blank"
      >How To Play</a>

      <a
        href="https://github.com/andmeek/sudoku"
        target="_blank"
      >Source Code on Github</a>
    </div>
  </div>
</template>

<script>
import Database from '../database.js'

export default {
  data () {
    return {
      showStats: false
    }
  },
  mounted () {
    Database.setup().then(() => {
      this.showStats = true
    }).catch(() => {})
  },
  methods: {
    newgame: function () {
      this.$emit('new-game')
    },
    stats: function () {
      this.$emit('stats')
    }
  }
}
</script>

<style>
.home .actions {
  text-align: center;
}

.home .menu {
  margin-bottom: 12px;
}
</style>
