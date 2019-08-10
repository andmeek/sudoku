<template>
  <div class="game-header">
    <span class="timer">{{ time }}</span>
    <span class="difficulty">{{ difficulty }}</span>
    <span><button class="menu inline" v-on:click="$emit('exit')">Exit Game</button></span>
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

<style>
.game-header {
  display: flex;
  font-size: 1.2em;
  line-height: 32px;
  padding: 5px 0px;
}

.game-header span  {
  width: 33%;
  display: block;
  padding: 1px;
}

.game-header .difficulty {
  text-align: center;
}

.game-header span:last-child {
  text-align: right;
}
</style>
