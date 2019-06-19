<template>
  <div class="board">
    <div class="row">
      <tile-group v-bind:x="0" v-bind:y="0" v-bind:board="board" />
      <tile-group v-bind:x="1" v-bind:y="0" v-bind:board="board" />
      <tile-group v-bind:x="2" v-bind:y="0" v-bind:board="board" />
    </div>
    <div class="row">
      <tile-group v-bind:x="0" v-bind:y="1" v-bind:board="board" />
      <tile-group v-bind:x="1" v-bind:y="1" v-bind:board="board" />
      <tile-group v-bind:x="2" v-bind:y="1" v-bind:board="board" />
    </div>
    <div class="row">
      <tile-group v-bind:x="0" v-bind:y="2" v-bind:board="board" />
      <tile-group v-bind:x="1" v-bind:y="2" v-bind:board="board" />
      <tile-group v-bind:x="2" v-bind:y="2" v-bind:board="board" />
    </div>
  </div>
</template>

<script>
import TileGroup from './tile-group.vue'

export default {
  props: ['board'],
  components: {
    TileGroup
  }
}
</script>

<style>

</style>
