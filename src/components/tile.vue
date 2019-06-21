<template>
  <div class="tile">
    <span v-if="tile.userEditable && tile.userValue != null" class="user-value">{{ tile.userValue }}</span>
    <span v-else-if="tile.userEditable" class="user-value">&nbsp;</span>
    <span v-else>{{ tile.actualValue }}</span>
  </div>
</template>

<script>
export default {
  props: ['board', 'tile'],
}
</script>
