<template>
  <div class="game screen">
    <game-board v-bind:board="board" />
    <game-input v-bind:board="board" />
  </div>
</template>

<script>
import GameBoard from '../components/game-board.vue'
import GameInput from '../components/game-input.vue'

export default {
  props: ['board'],
  components: {
    GameBoard, GameInput
  }
}
</script>
