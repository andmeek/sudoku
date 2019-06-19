<template>
  <div class="button-group">
    <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
            v-bind:class="{selected: board.currentInput == n, disabled: board.numberCompleted(n)}"
            v-bind:disabled="board.numberCompleted(n)"
            v-bind:value="n"
            v-on:click="buttonClick"
            >{{ n == 0 ? 'Erase' : n }}</button>
    <button v-bind:class="{selected: board.draftMode}" v-on:click="draftClick">Pencil</button>
  </div>
</template>

<script>
export default {
  props: ['board'],
  methods: {
    buttonClick: function(event) {
      this.changeInput(event.target.value)
    },
    draftClick: function(event) {
      this.board.draftMode = !this.board.draftMode
    },
    keyUp: function(event) {
      if(event.keyCode > 47 && event.keyCode < 58) {
        this.changeInput(event.key)
      } else if(event.key == "e") {
        this.draftClick()
      }
    },
    changeInput: function(to) {
      var val = parseInt(to)

      if(!this.board.numberCompleted(val)) {
        this.board.userInput = val
      }
    },
  },
  created: function() {
    window.addEventListener('keyup', this.keyUp)
  },
  destroyed: function() {
    window.removeEventListener('keyup', this.keyUp)
  },
}
</script>

<style>
.button-group button.selected {
  background-color: white;
}
</style>
