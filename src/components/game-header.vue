<template>
  <div class="game-header">
    <span class="difficulty">{{ difficulty }}</span>
    <span class="timer">{{ time }}</span>
    <button v-on:click="$emit('exit')">Exit Game</button>
  </div>
</template>

<script>
export default {
  props: ['board', 'difficulty'],
  computed: {
    time: function() {
      var hoursRemainder = this.board.timer % 3600,
          hours = (this.board.timer - hoursRemainder) / 3600,
          minutes = (hoursRemainder - hoursRemainder % 60) / 60,
          seconds = this.board.timer - (hours * 3600 + minutes * 60)

      hours = hours < 10 ? `0${hours}` : hours
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
      return `${hours}:${minutes}:${seconds}`
    }
  },
}
</script>
