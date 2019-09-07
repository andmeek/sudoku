<template>
  <div class="board">
    <div
      v-for="outerRow in [0, 1, 2]"
      :key="outerRow"
      class="row"
      :rownum="outerRow"
    >
      <div
        v-for="outerCol in [0, 1, 2]"
        :key="outerCol"
        class="tile-group"
        :colnum="outerCol"
      >
        <div class="row">
          <tile
            v-for="tile in tilesForRow(outerCol, outerRow, 0)"
            :key="tile.id"
            :tile="tile"
            :game="game"
            :selected="tile == selectedTile"
            :selected-sibling="tile.isSibling(selectedTile)"
            @tileclick="tileClick"
          />
        </div>
        <div class="row">
          <tile
            v-for="tile in tilesForRow(outerCol, outerRow, 1)"
            :key="tile.id"
            :tile="tile"
            :game="game"
            :selected="tile == selectedTile"
            :selected-sibling="tile.isSibling(selectedTile)"
            @tileclick="tileClick"
          />
        </div>
        <div class="row">
          <tile
            v-for="tile in tilesForRow(outerCol, outerRow, 2)"
            :key="tile.id"
            :tile="tile"
            :game="game"
            :selected="tile == selectedTile"
            :selected-sibling="tile.isSibling(selectedTile)"
            @tileclick="tileClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from './tile.vue'

export default {
  components: {
    Tile
  },
  props: { game: { type: Object, required: true } },
  data () {
    return {
      selectedTile: null
    }
  },
  watch: {
    'game.currentInput': function () {
      this.inputChanged()
    }
  },
  methods: {
    inputChanged: function () {
      if (this.selectedTile != null) {
        var selected = this.selectedTile

        this.tileClick(this.selectedTile)

        if (!selected.completed) {
          this.selectedTile = selected
        }
      }
    },
    tileClick: function (tile) {
      if (this.game.eraseMode) {
        tile.userValue = null
      } else if (this.game.draftMode) {
        tile.toggleDraft(this.game.currentInput)
      } else {
        tile.toggleValue(this.game.currentInput)
      }

      this.selectedTile = tile === this.selectedTile ? null : tile

      if (this.game.board.numberCompleted(this.game.currentInput)) {
        this.selectedTile = null
        this.game.currentInput = null
      }

      this.game.board.grid.setUserState(tile.x, tile.y, tile.completed)
    },
    tilesForRow: function (col, row, innerCol) {
      return [
        this.game.board.tileAt(col * 3, innerCol + row * 3),
        this.game.board.tileAt(1 + col * 3, innerCol + row * 3),
        this.game.board.tileAt(2 + col * 3, innerCol + row * 3)
      ]
    }
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
