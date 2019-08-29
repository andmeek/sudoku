<template>
	<div class="user-input">
	  <div class="numbers">
	    <div>
        <button v-for="n in [1, 2, 3, 4, 5]"
                v-bind:class="{selected: current == n && !game.board.numberCompleted(n), disabled: game.board.numberCompleted(n)}"
                v-bind:disabled="game.board.numberCompleted(n)"
                v-bind:value="n"
                v-on:click="buttonClick(n)">{{ n }}</button>
      </div>
      <div>
        <button v-for="n in [6, 7, 8, 9]"
                v-bind:class="{selected: current == n && !game.board.numberCompleted(n), disabled: game.board.numberCompleted(n)}"
                v-bind:disabled="game.board.numberCompleted(n)"
                v-bind:value="n"
                v-on:click="buttonClick(n)">{{ n }}</button>
        <button v-bind:class="{selected: eraserMode}" v-bind:value="0" v-on:click="buttonClick(0)">
          <font-awesome-icon icon="eraser" size="sm" />
        </button>
      </div>
    </div>
    <div class="actions">
      <button v-bind:class="{selected: draftMode}" v-on:click="draftClick" value="pencil" title="Add notes">
        <font-awesome-icon icon="pencil-alt" size="sm" />
      </button>
      <button v-bind:class="{selected: showAllNotes}" v-on:click="toggleAllNotes" value="all-notes" title="Show all notes">
        <font-awesome-icon icon="sticky-note" size="sm" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['game'],
  data() {
    return {
      current: null,
      eraserMode: false,
      draftMode: false,
      showAllNotes: false,
    }
  },
  methods: {
    buttonClick: function(val) {
      this.changeInput(val)
    },
    draftClick: function(event) {
      this.game.draftMode = !this.game.draftMode
      this.draftMode = this.game.draftMode
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
      this.game.currentInput = parseInt(to)
      this.current = this.game.currentInput
      this.eraserMode = this.game.eraserMode
    },
    toggleAllNotes: function() {
      this.game.showAllNotes = !this.game.showAllNotes
      this.showAllNotes = this.game.showAllNotes
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
  text-align: center;
}

.user-input  button {
  background-color: #f5f0ea;
  border-radius: 100%;
  border: 1px solid #aaa;
  box-shadow: 1px 1px 1px 1px #ddd;
  cursor: pointer;
  font-size: 2.5em;
  font-weight: bold;
  height: 65px;
  margin: 2px;
  outline: none;
  width: 65px;
}

.user-input .actions button {
  border: none;
  box-shadow: none;
  background-color: white;
  width: 45px;
  height: 45px;
}

.user-input button.selected {
  border-color: black;
  background-color: slategray;
  color: white;
}

.user-input button.disabled {
  background-color: white;
  border-color: #ddd;
  box-shadow: none;
  color: #ddd;
}
</style>
