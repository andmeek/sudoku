<template>
  <div class="tile-group">
    <div class="row">
      <tile v-bind:tile="board.tileAt(tX, tY)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 1, tY)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 2, tY)" v-bind:board="board" />
    </div>
    <div class="row">
      <tile v-bind:tile="board.tileAt(tX, tY + 1)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 1, tY + 1)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 2, tY + 1)" v-bind:board="board" />
    </div>
    <div class="row">
      <tile v-bind:tile="board.tileAt(tX, tY + 2)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 1, tY + 2)" v-bind:board="board" />
      <tile v-bind:tile="board.tileAt(tX + 2, tY + 2)" v-bind:board="board" />
    </div>
  </div>
</template>

<script>
import Tile from './tile.vue'

export default {
  props: ['board', 'x', 'y'],
  computed: {
    tX: function () {
      return this.x * 3
    },
    tY: function () {
      return this.y * 3
    }
  },
  components: {
    Tile
  }
}
</script>

<style>
.tile-group {
  display: table-cell;
  border: 1px solid black;
}

.tile-group .row, .board .row {
  display: table-row;
}

.tile-group .row .tile {
  display: table-cell;
  width: 50px;
  height: 50px;
  font-size: 3.0em;
  text-align: center;
  border: 0.5px solid lightgrey;
  cursor: pointer;
  user-select: none;
}
</style>
