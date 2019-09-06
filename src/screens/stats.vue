<template>
  <div class="stats screen">
    <h1>Gameplay Stats</h1>

    <button ref="exit" class="menu" v-on:click="$emit('exit')">Back</button>
  </div>
</template>

<script>
import Database from '../database.js'

export default {

}
</script>

<style>

</style>
