<template>
  <div class="game screen">
     <game-board v-bind:board="board" />
     <user-input v-bind:board="board" v-on:inputchanged="inputChanged" />
  </div>
</template>

<script>
import GameBoard from '../components/game-board.vue'
import UserInput from '../components/user-input.vue'

export default {
  props: ['board'],
  methods: {
    inputChanged: function(to, pencil) {
      this.$children[0].pencil = pencil
      this.$children[0].currentInput = to
    },
  },
  components: {
    GameBoard, UserInput
  }
}
</script>
