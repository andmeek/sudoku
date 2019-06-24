<template>
	<div class="button-group">
    <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
            v-bind:class="{selected: current == n, disabled: board.numberCompleted(n)}"
            v-bind:disabled="board.numberCompleted(n)"
            v-bind:value="n"
            v-on:click="buttonClick"
            >{{ n == 0 ? 'Erase' : n }}</button>
    <button v-bind:class="{selected: pencil}" v-on:click="draftClick" value="pencil">Pencil</button>
  </div>
</template>

<script>
export default {
  props: ['board'],
  data() {
    return {
      current: null,
      pencil: false,
    }
  },
  methods: {
    buttonClick: function(event) {
      this.changeInput(event.target.value)
    },
    draftClick: function(event) {
      this.pencil = !this.pencil
      this.$emit('inputchanged', this.current, this.pencil)
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
        this.current = this.current == val ? null : val
      }
      this.$emit('inputchanged', this.current, this.pencil)
    },
  },
  updated: function() {
    if(this.current != null && this.board.numberCompleted(this.current)) {
      this.current = null
    }
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
.button-group button {
  border: 1px solid #aaa;
  box-shadow: 1px 1px 1px 1px #ddd;
  background-color: #eee;
  border-radius: 2px;
  margin: 2px;
}
.button-group button.selected {
  border-color: black;
  background-color: white;
}
</style>
