<template>
  <div
    class="tile"
    :class="{
      selected: selected,
      'selected-sibling': selectedSibling,
      'current-input': currentInput,
      error: tile.error,
    }"
    @mouseover="$emit('tilefocus', tile)"
    @mouseout="$emit('tilefocus', null)"
    @click="$emit('tileclick', tile)"
  >
    <span
      v-if="game.hintTile == tile"
      class="hint"
    >{{ tile.actualValue }}</span>
    <span
      v-else-if="tile.userEditable && tile.userValue != null"
      class="user-value"
    >{{ tile.userValue }}</span>
    <span
      v-else-if="game.showAllNotes && tile.userEditable"
      class="potential-values"
    >
      <span
        v-for="v in potentialValues"
        :key="v"
      >{{ v }}</span>
    </span>
    <div
      v-else-if="tile.userDrafts.length > 0"
      class="draft-values"
    >
      <span
        v-for="v in sortedDrafts"
        :key="v"
      >{{ v }}</span>
    </div>
    <span
      v-else-if="tile.userEditable"
      class="user-value"
    />
    <span v-else>{{ tile.actualValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    game: { type: Object, required: true },
    tile: { type: Object, required: true },
    selected: { type: Boolean, default: false },
    selectedSibling: { type: Boolean, default: false }
  },
  data () {
    return {
      potentialValues: []
    }
  },
  computed: {
    currentInput () {
      return this.game.currentInput === this.tile.actualValue && this.tile.completed
    },
    sortedDrafts () {
      return this.tile.userDrafts.slice(0).sort()
    }
  },
  watch: {
    'game.timer': function (val) {
      this.updatePotentialValues()
    },
    'tile.error': function (val) {
      if (val) {
        this.game.recordMistake()
      }
    }
  },
  mounted () {
    var width = `${this.$el.clientWidth}px`
    this.$el.style.height = width
    this.$el.style.lineHeight = width

    this.updatePotentialValues()
  },
  methods: {
    updatePotentialValues: function () {
      this.potentialValues = this.game.board.grid.potentialValues(this.tile.x, this.tile.y, true)
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
  background-color: #d4dadf;
}
.tile .user-val {
  color: #888;
}
.tile .draft-values, .tile .potential-values {
  font-size: 0.3em;
  color: #555;
  text-align: left;
  line-height: 20px;
}
.tile .draft-values span, .tile .potential-values span {
  padding: 0px 2px;
  font-weight: normal;
  display: inline-block;
}

.tile .hint {
  animation-duration: 0.5s;
  animation-name: tilehint;
  animation-iteration-count: infinite;
}

@keyframes tilehint {
  from {
    color: black;
  }

  to {
    color: #9acd32;
    font-weight: bold;
  }
}
</style>
