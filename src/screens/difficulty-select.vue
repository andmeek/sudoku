<template>
  <div class="difficulty screen">
    <h1>Select Difficulty</h1>

    <div class="actions">
      <button
        class="menu"
        @click="$emit('difficultyselected', 20, 'Easy')"
      >
        Easy
      </button>
      <button
        class="menu"
        @click="$emit('difficultyselected', 30, 'Medium')"
      >
        Medium
      </button>
      <button
        class="menu"
        @click="$emit('difficultyselected', 38, 'Hard')"
      >
        Hard
      </button>
      <button
        class="menu"
        @click="$emit('difficultyselected', 47, 'Very Hard')"
      >
        Very Hard
      </button>
      <button
        class="menu"
        @click="$emit('difficultyselected', 56, 'Insane')"
      >
        Insane
      </button>
      <button
        class="menu"
        @click="$emit('difficultyselected', 64, 'Unthinkable')"
      >
        Unthinkable
      </button>
    </div>

    <button
      ref="exit"
      class="menu"
      @click="$emit('exit')"
    >
      Back
    </button>
  </div>
</template>

<style>
.difficulty .actions {
  padding-bottom: 32px;
}
</style>
