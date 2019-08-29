<template>
  <div class="board">
    <div class="row" v-for="outerRow in [0, 1, 2]" :rownum="outerRow">
      <div class="tile-group" v-for="outerCol in [0, 1, 2]" :colnum="outerCol">
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 0)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:game="game"
                v-bind:selected="tile == selectedTile"
                v-bind:selectedSibling="tile.isSibling(selectedTile)"
                v-on:tileclick="tileClick"
                />
        </div>
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 1)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:game="game"
                v-bind:selected="tile == selectedTile"
                v-bind:selectedSibling="tile.isSibling(selectedTile)"
                v-on:tileclick="tileClick"
                />
        </div>
        <div class="row">
          <tile v-for="tile in tilesForRow(outerCol, outerRow, 2)"
                v-bind:tile="tile"
                v-bind:key="tile.id"
                v-bind:game="game"
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
  props: ['game'],
  data() {
    return {
      selectedTile: null,
    }
  },
  methods: {
    inputChanged: function() {
      if(this.selectedTile != null) {
        var selected = this.selectedTile

        this.tileClick(this.selectedTile)

        this.selectedTile = selected
      }
    },
    tileClick: function(tile) {
      if(this.game.eraseMode) {
        tile.userValue = null
      } else if(this.game.draftMode) {
        tile.toggleDraft(this.game.currentInput)
      } else {
        tile.toggleValue(this.game.currentInput)
      }

      this.selectedTile = tile == this.selectedTile ? null : tile

      if(this.game.board.numberCompleted(this.game.currentInput)) {
        this.selectedTile = null
        this.game.currentInput = null
      }

      this.game.board.grid.setUserState(tile.x, tile.y, tile.completed)
    },
    tilesForRow: function(col, row, innerCol) {
      return [
        this.game.board.tileAt(col * 3, innerCol + row * 3),
        this.game.board.tileAt(1 + col * 3, innerCol + row * 3),
        this.game.board.tileAt(2 + col * 3, innerCol + row * 3),
      ]
    },
  },
  watch: {
    'game.currentInput': function() {
      this.inputChanged()
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
