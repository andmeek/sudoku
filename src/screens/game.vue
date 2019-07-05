<template>
  <div class="game screen">
     <div class="header">
        <button v-on:click="$emit('exit')">Exit Game</button>
     </div>
     <game-board v-bind:board="board" v-if="!board.completed" />
     <user-input v-bind:board="board" v-if="!board.completed" v-on:inputchanged="inputChanged" />
     <div class="completed" v-if="board.completed">
        You win!

        <button v-on:click="confirmCompleted">Okay</button>
     </div>
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
    confirmCompleted: function() {
      this.$emit('gamecompleted')
    }
  },
  components: {
    GameBoard, UserInput
  }
}
</script>
