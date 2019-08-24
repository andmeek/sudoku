<template>
  <div class="game screen">
     <game-header
       v-if="!board.completed"
       v-bind:board="board"
       v-bind:difficulty="difficulty"
       v-on:exit="$emit('exit')"
     />
     <game-board v-bind:board="board" v-if="!board.completed" />
     <user-input v-bind:board="board" v-if="!board.completed" v-on:inputchanged="inputChanged" />
     <div class="completed" v-if="board.completed">
       <h1>
          You won!
       </h1>

       <dl>
        <dt>Difficulty</dt>
        <dd>{{ difficulty }}</dd>
        <dt>Time</dt>
        <dd>{{ board.timer.toTimerDisplay() }}</dd>
       </dl>

        <button class="menu" v-on:click="confirmCompleted">Okay</button>
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
      paused: false,
      tick: null,
    }
  },
  methods: {
    inputChanged: function(to, pencil) {
      this.$children[1].pencil = pencil
      this.$children[1].currentInput = to
    },
    confirmCompleted: function() {
      this.$emit('gamecompleted')
    },
    gameTick: function() {
      if(!this.board.completed && !this.paused) {
        this.board.incrementTimer()
      }
    },
    onVisibilityChange: function() {
      if(document.visibilityState == 'hidden') {
        this.paused = true
      } else {
        this.paused = false
      }
    },
  },
  created() {
    this.tick = setInterval(this.gameTick.bind(this), 1000)
    window.addEventListener('visibilitychange', this.onVisibilityChange)
  },
  destroyed() {
    clearInterval(this.tick)
    window.removeEventListener('visibilitychange', this.onVisibilityChange)
  },
  components: {
    GameBoard, GameHeader, UserInput
  }
}
</script>

<style>
dl {
  width: 80%;
  margin-left: 10%;
  font-size: 1.4em;
}

dt, dd {
  width: 49%;
  display: inline-block;
  margin: 0;
  padding-bottom: 6px;
}
</style>
