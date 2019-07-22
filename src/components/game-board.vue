<template>
  <div class="board">
    <div class="row" v-for="outerRow in [0, 1, 2]" :rownum="outerRow">
      <div class="tile-group" v-for="outerCol in [0, 1, 2]" :colnum="outerCol">
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 0)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:board="board"
                v-bind:currentInput="currentInput == tile.actualValue"
                v-bind:selected="tile == selectedTile"
                v-bind:selectedSibling="tile.isSibling(selectedTile)"
                v-on:tileclick="tileClick"
                />
        </div>
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 1)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:board="board"
                v-bind:currentInput="currentInput == tile.actualValue"
                v-bind:selected="tile == selectedTile"
                v-bind:selectedSibling="tile.isSibling(selectedTile)"
                v-on:tileclick="tileClick"
                />
        </div>
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 2)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:board="board"
                v-bind:currentInput="currentInput == tile.actualValue"
                v-bind:selected="tile == selectedTile"
                v-bind:selectedSibling="tile.isSibling(selectedTile)"
                v-on:tileclick="tileClick"
                />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from './tile.vue'

export default {
  props: ['board'],
  data() {
    return {
      currentInput: null,
      pencil: false,
      selectedTile: null,
    }
  },
  methods: {
    tileClick: function(tile) {
      if(this.currentInput == 0) {
        tile.userValue = null
      } else if(this.pencil) {
        tile.toggleDraft(this.currentInput)
      } else {
        tile.toggleValue(this.currentInput)
      }

      this.selectedTile = tile == this.selectedTile ? null : tile

      this.board.grid.setUserState(tile.x, tile.y, tile.completed)
    },
    tilesForRow: function(col, row, innerCol) {
      return [
        this.board.tileAt(col * 3, innerCol + row * 3),
        this.board.tileAt(1 + col * 3, innerCol + row * 3),
        this.board.tileAt(2 + col * 3, innerCol + row * 3),
      ]
    },
  },
  components: {
    Tile
  }
}
</script>

<style>
.tile-group {
  border: 1px solid black;
  float: left;
  width: 33%;
}
.board .row, .tile-group .row {
  display: flex;
}

.tile-group .row .tile {
  font-size: 3.0em;
  text-align: center;
  border: 0.5px solid lightgrey;
  cursor: pointer;
  user-select: none;
  float: left;
  width: 33%;
}
</style>
