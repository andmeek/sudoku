<template>
  <div class="tile"
       v-bind:class="{
       selected: selected,
       'selected-sibling': selectedSibling,
       'current-input': currentInput,
       error: tile.error,
       }"
       v-on:mouseover="$emit('tilefocus', tile)"
       v-on:mouseout="$emit('tilefocus', null)"
       v-on:click="$emit('tileclick', tile)">
    <span v-if="tile.userEditable && tile.userValue != null" class="user-value">{{ tile.userValue }}</span>
    <div v-else-if="tile.userDrafts.length > 0" class="draft-values">
      <span v-for="v in sortedDrafts">{{ v }}</span>
    </div>
    <span v-else-if="tile.userEditable" class="user-value"></span>
    <span v-else>{{ tile.actualValue }}</span>
  </div>
</template>

<script>
export default {
  props: ['board', 'tile', 'currentInput', 'selected', 'selectedSibling'],
  computed: {
    sortedDrafts() {
      return this.tile.userDrafts.sort()
    }
  }
}
</script>

<style>
.tile:hover {
  background-color: #aaa;
}
.tile.selected {
  background-color: #ccc;
}
.tile.error, .tile.error .user-val {
  color: red;
}
.tile.selected-sibling {
  background-color: #eee;
}
.tile.current-input {
  font-weight: bold;
}
.tile .user-val {
  color: #888;
}
.tile .draft-values {
  font-size: 0.3em;
  position: fixed;
  color: #555;
  text-align: left;
  width: 50px;
}
.tile .draft-values span {
  padding: 0px 2px;
  font-weight: normal;
  display: inline-block;
}
</style>
