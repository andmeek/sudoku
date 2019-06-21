<template>
  <div class="game screen">
     <game-board v-bind:board="board" />
     <user-input v-bind:board="board" />
  </div>
</template>

<script>
import GameBoard from '../components/game-board.vue'
import UserInput from '../components/user-input.vue'

export default {
  props: ['board'],
  components: {
    GameBoard, UserInput
  }
}
</script>
