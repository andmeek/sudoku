<template>
  <div class="difficulty screen">
     <h1>Select Difficulty</h1>

     <div class="actions">
       <button v-on:click="$emit('difficultyselected', 40, 'Easy')">Easy</button>
       <button v-on:click="$emit('difficultyselected', 55, 'Medium')">Medium</button>
       <button v-on:click="$emit('difficultyselected', 60, 'Hard')">Hard</button>
       <button v-on:click="$emit('difficultyselected', 65, 'Very Hard')">Very Hard</button>
     </div>

     <button v-on:click="$emit('exit')">Back</button>
  </div>
</template>
