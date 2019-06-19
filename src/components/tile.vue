<template>
  <div class="tile"
      v-bind:class="{
          over: this.tile.hovered,
          error: this.tile.error,
          'hover-sibling': this.tile.hoverSibling,
          'selected-sibling': this.tile.selectionSibling,
          'selected-user-input': this.tile.selectedUserInput,
          selected: this.tile.selected
       }"
      v-on:mouseover="over"
      v-on:click="click"
      v-on:mouseout="out">
    <span v-if="tile.shown">{{ tile.actualValue }}</span>
    <span v-else-if="tile.userValue != null" class="user-val">{{ tile.userValue}}</span>
    <div v-else-if="sortedDraftVals.length" class="draft-values">
      <span v-for="v in sortedDraftVals">{{ v }}</span>
    </div>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: ['tile', 'board'],
  methods: {
    click: function(event) {
      this.board.tileSelected(this.tile)
    },
    over: function(event) {
      this.tile.hovered = true
      this.board.tileHovered()
    },
    out: function(event) {
      this.tile.hovered = false
      this.board.tileHovered()
    },
  },

  computed: {
    sortedDraftVals: function() {
      return this.tile.userDraftValues.sort()
    }
  },
}
</script>

<style>
.tile.over {
  background-color: #aaa;
}

.tile.selected {
  background-color: #ccc;
}

.tile.error, .tile.error .user-val {
  color: red;
}

.tile.hover-sibling {
  background-color: #ddd;
}

.tile.selected-sibling {
  background-color: #eee;
}

.tile.selected-user-input {
  font-weight: bold;
}

.tile .user-val {
  color: #888;
}

.tile .draft-values {
  font-size: 0.3em;
  position: fixed;
  color: #555;
}

.tile .draft-values span {
  padding: 0px 2px;
}
</style>
