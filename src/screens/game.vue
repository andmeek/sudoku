<template>
  <div class="game screen">
    <game-header
      v-if="!game.completed"
      :game="game"
      @exit="exit"
    />
    <game-board
      v-if="!game.completed"
      :game="game"
    />
    <user-input
      v-if="!game.completed"
      :game="game"
    />
    <div
      v-if="game.completed"
      class="completed"
    >
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

      <button
        ref="gamecompleted"
        class="menu"
        @click="confirmCompleted"
      >
        Okay
      </button>
    </div>
  </div>
</template>

<script>
import Database from '../database.js'
import GameBoard from '../components/game-board.vue'
import GameHeader from '../components/game-header.vue'
import UserInput from '../components/user-input.vue'

export default {
  components: {
    GameBoard, GameHeader, UserInput
  },
  props: { game: { type: Object, required: true } },
  data () {
    return {
      paused: false,
      tick: null
    }
  },
  created () {
    this.tick = setInterval(this.gameTick.bind(this), 1000)
    window.addEventListener('visibilitychange', this.onVisibilityChange)
  },
  destroyed () {
    clearInterval(this.tick)
    window.removeEventListener('visibilitychange', this.onVisibilityChange)
  },
  methods: {
    confirmCompleted: function () {
      this.$emit('gamecompleted')

      return Database.recordGame(this.game)
    },
    exit: function () {
      this.$emit('exit')

      return Database.recordGame(this.game)
    },
    gameTick: function () {
      if (!this.game.completed && !this.paused) {
        this.game.incrementTimer()
      }
    },
    onVisibilityChange: function () {
      if (document.visibilityState === 'hidden') {
        this.paused = true
      } else {
        this.paused = false
      }
    }
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
