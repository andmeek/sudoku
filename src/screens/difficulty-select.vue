<template>
  <div class="difficulty screen">
     <h1>Select Difficulty</h1>

     <div class="actions">
       <button class="menu" v-on:click="$emit('difficultyselected', 40, 'Easy')">Easy</button>
       <button class="menu" v-on:click="$emit('difficultyselected', 55, 'Medium')">Medium</button>
       <button class="menu" v-on:click="$emit('difficultyselected', 60, 'Hard')">Hard</button>
       <button class="menu" v-on:click="$emit('difficultyselected', 65, 'Very Hard')">Very Hard</button>
     </div>

     <button class="menu" v-on:click="$emit('exit')">Back</button>
  </div>
</template>

<style>
.difficulty .actions {
  padding-bottom: 32px;
}
</style>
