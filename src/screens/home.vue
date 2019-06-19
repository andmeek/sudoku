<template>
  <div class="home screen">
    <h1>Play Sudoku</h1>

    <div class="actions">
      <button v-on:click="newgame">New Game</button>
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
