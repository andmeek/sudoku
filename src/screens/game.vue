<template>
  <div class="game screen">
     <game-header v-bind:board="board" v-bind:difficulty="difficulty" v-on:exit="$emit('exit')" />
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
import GameHeader from '../components/game-header.vue'
import UserInput from '../components/user-input.vue'

export default {
  props: ['difficulty', 'board'],
  data() {
    return {
      tick: null,
    }
  },
  methods: {
    inputChanged: function(to, pencil) {
      this.$children[0].pencil = pencil
      this.$children[0].currentInput = to
    },
    confirmCompleted: function() {
      this.$emit('gamecompleted')
    }
  },
  created() {
    this.tick = setInterval(this.board.incrementTimer.bind(this.board), 1000)
  },
  destroyed() {
    clearInterval(this.tick)
  },
  components: {
    GameBoard, GameHeader, UserInput
  }
}
</script>
