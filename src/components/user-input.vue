<template>
	<div class="user-input">
	  <div class="numbers">
      <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              v-bind:class="{selected: current == n && !board.numberCompleted(n), disabled: board.numberCompleted(n)}"
              v-bind:disabled="board.numberCompleted(n)"
              v-bind:value="n"
              v-on:click="buttonClick">{{ n }}</button>
    </div>
    <div class="actions">
      <button v-bind:class="{selected: current == 0}" v-bind:value="0" v-on:click="buttonClick">Erase</button>
      <button v-bind:class="{selected: pencil}" v-on:click="draftClick" value="pencil">Pencil</button>
    </div>
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

      this._triggerInputChange()
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
      } else if(this.current == val) {
        this.current = null
      }

      this._triggerInputChange()
    },
    _triggerInputChange: function() {
      this.$emit('inputchanged', this.current, this.pencil)
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
.user-input {
  display: flex;
}
.user-input button {
  border: 1px solid #aaa;
  box-shadow: 1px 1px 1px 1px #ddd;
  background-color: #eee;
  border-radius: 2px;
  margin: 2px;
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
}

.user-input .numbers button {
  width: 30%;
}

.user-input button.selected {
  border-color: black;
  background-color: white;
}
</style>
