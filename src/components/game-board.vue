<template>
  <div class="board">
    <div class="row" v-for="outerRow in [0, 1, 2]" :rownum="outerRow">
      <div class="tile-group" v-for="outerCol in [0, 1, 2]" :colnum="outerCol">
        <div class="row">
          <tile v-bind:board="board" v-bind:tile="board.tileAt(0 + outerCol * 3, 0 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(1 + outerCol * 3, 0 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(2 + outerCol * 3, 0 + outerRow * 3)" />
        </div>
        <div class="row">
          <tile v-bind:board="board" v-bind:tile="board.tileAt(0 + outerCol * 3, 1 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(1 + outerCol * 3, 1 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(2 + outerCol * 3, 1 + outerRow * 3)" />
        </div>
        <div class="row">
          <tile v-bind:board="board" v-bind:tile="board.tileAt(0 + outerCol * 3, 2 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(1 + outerCol * 3, 2 + outerRow * 3)" />
          <tile v-bind:board="board" v-bind:tile="board.tileAt(2 + outerCol * 3, 2 + outerRow * 3)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from './tile.vue'

export default {
  props: ['board'],
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
