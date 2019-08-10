<template>
  <div class="home screen">
    <h1>Play Sudoku</h1>

    <div class="actions">
      <button class="menu" v-on:click="newgame">New Game</button>

      <a href="https://github.com/andmeek/sudoku" target="_blank">Source Code on Github</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    newgame: function(event) {
      this.$emit("new-game")
    },
  },
}
</script>

<style>
.home .actions {
  text-align: center;
}

.home .menu {
  margin-bottom: 32px;
}
</style>
