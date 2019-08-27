<template>
	<div class="user-input">
	  <div class="numbers">
	    <div>
        <button v-for="n in [1, 2, 3, 4, 5]"
                v-bind:class="{selected: current == n && !board.numberCompleted(n), disabled: board.numberCompleted(n)}"
                v-bind:disabled="board.numberCompleted(n)"
                v-bind:value="n"
                v-on:click="buttonClick(n)">{{ n }}</button>
      </div>
      <div>
        <button v-for="n in [6, 7, 8, 9]"
                v-bind:class="{selected: current == n && !board.numberCompleted(n), disabled: board.numberCompleted(n)}"
                v-bind:disabled="board.numberCompleted(n)"
                v-bind:value="n"
                v-on:click="buttonClick(n)">{{ n }}</button>
        <button v-bind:class="{selected: current == 0}" v-bind:value="0" v-on:click="buttonClick(0)">
          <font-awesome-icon icon="eraser" size="sm" />
        </button>
      </div>
    </div>
    <div class="actions">
      <button v-bind:class="{selected: pencil}" v-on:click="draftClick" value="pencil" title="Add notes">
        <font-awesome-icon icon="pencil-alt" size="sm" />
      </button>
      <button v-bind:class="{selected: allNotes}" v-on:click="toggleAllNotes" value="all-notes" title="Show all notes">
        <font-awesome-icon icon="sticky-note" size="sm" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['board'],
  data() {
    return {
      allNotes: false,
      current: null,
      pencil: false,
    }
  },
  methods: {
    buttonClick: function(val) {
      this.changeInput(val)
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
    toggleAllNotes: function() {
      this.allNotes = !this.allNotes

      this.$emit('showallnotes', this.allNotes)
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
