<template>
  <div class="game-header">
    <span class="timer">{{ game.timer.toTimerDisplay() }}</span>
    <span class="difficulty">{{ game.difficulty }}</span>
    <span><button
      class="menu inline"
      @click="$emit('exit')"
    >Exit Game</button></span>
  </div>
</template>

<script>
export default {
  props: { game: { type: Object, required: true } }
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
