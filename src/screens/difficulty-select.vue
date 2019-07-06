<template>
  <div class="difficulty screen">
     <h1>Select Difficulty</h1>

     <div class="actions">
       <button v-on:click="$emit('difficultyselected', 30, 'Easy')">Easy</button>
       <button v-on:click="$emit('difficultyselected', 45, 'Medium')">Medium</button>
       <button v-on:click="$emit('difficultyselected', 65, 'Hard')">Hard</button>
     </div>

     <button v-on:click="$emit('exit')">Back</button>
  </div>
</template>
