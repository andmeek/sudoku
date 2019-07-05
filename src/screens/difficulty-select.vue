<template>
  <div class="difficulty screen">
     <h1>Select Difficulty</h1>

     <div class="actions">
       <button value="5" v-on:click="selectDifficulty">Very Easy</button>
       <button value="20" v-on:click="selectDifficulty">Easy</button>
       <button value="40" v-on:click="selectDifficulty">Medium</button>
       <button value="60" v-on:click="selectDifficulty">Hard</button>
     </div>

     <button v-on:click="$emit('exit')">Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    selectDifficulty: function(event) {
      this.$emit('difficultyselected', parseInt(event.target.value))
    },
  },
}
</script>
