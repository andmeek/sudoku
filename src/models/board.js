import Tile from './tile.js'
import { SUDOKU_NUMBERS } from '../variables.js'

export default class Board {
  constructor(values, state) {
    this.tiles = []
    for(var y = 0; y < values.length; y++) {
      for(var x = 0; x < values[y].length; x++) {
        var tile = new Tile(x, y, values[y][x], state[y][x] == 1)
        this.tiles.push(tile)
      }
    }

    this.selectedTile = null
    this.currentInput = null
    this.draftMode = false
  }

  tileAt(x, y) {
    for(var i in this.tiles) {
      if(this.tiles[i].x == x && this.tiles[i].y == y) {
        return this.tiles[i]
      }
    }
    return null
  }

  tileSelected(tile) {
    if(this.eraseMode) {
      tile.userValue = null
    } else if(this.draftMode) {
      tile.toggleDraft(this.currentInput)
    } else if(this.currentInput != null) {
      tile.toggleValue(this.currentInput)
    }

    if(this.selectedTile != null) {
      this.selectedTile.selected = false
    }

    if(this.selectedTile == tile) {
      this.selectedTile = null
    } else {
      this.selectedTile = tile
      this.selectedTile.selected = true
    }

    this.tiles.forEach((otherTile) => {
      otherTile.selectionSibling = otherTile.isSibling(this.selectedTile)
    })

    if(this.numberCompleted(this.currentInput)) {
      this.currentInput = null
    }
  }

  tileHovered() {
    this.tiles.forEach((otherTile) => {
      otherTile.hoverSibling = otherTile.isSibling(this.hoveredTile)
    })
  }

  numberCompleted(number) {
    return this.tiles.filter((t) => t.completed && t.actualValue == number).length == 9
  }

  get gameCompleted() {
    return SUDOKU_NUMBERS
      .map((n) => this.numberCompleted(n))
      .reduce((t, n) => t && n)
  }

  get hoveredTile() {
    return this.tiles.find((tile) => tile.hovered)
  }

  get eraseMode() { return this.currentInput == 0 }

  set userInput(to) {
    if(to == this.currentInput) {
      this.currentInput = null
    } else {
      this.currentInput = to
    }

    this.tiles.forEach((tile) => {
      tile.selectedUserInput = tile.actualValue == this.currentInput
    })
  }
}
