<template>
  <div class="game screen">
     <game-header
       v-if="!game.completed"
       v-bind:game="game"
       v-on:exit="$emit('exit')"
     />
     <game-board v-bind:game="game" v-if="!game.completed" />
     <user-input v-bind:game="game" v-if="!game.completed" />
     <div class="completed" v-if="game.completed">
       <h1>
          You won!
       </h1>

       <dl>
        <dt>Difficulty</dt>
        <dd>{{ game.difficulty }}</dd>
        <dt>Time</dt>
        <dd>{{ game.timer.toTimerDisplay() }}</dd>
        <dt>Mistakes</dt>
        <dd>{{ game.mistakes }}</dd>
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
  props: ['game'],
  data() {
    return {
      paused: false,
      tick: null,
    }
  },
  methods: {
    confirmCompleted: function() {
      this.$emit('gamecompleted')
    },
    gameTick: function() {
      if(!this.game.completed && !this.paused) {
        this.game.incrementTimer()
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
