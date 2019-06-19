export default class Tile {
  constructor(x, y, actualValue, shown, userValue = null) {
    this.x = x
    this.y = y
    this.actualValue = actualValue
    this.userValue = userValue
    this.potentialValues = []
    this.userDraftValues = []
    this.shown = shown

    this.hoverSibling = false
    this.hovered = false
    this.selected = false
    this.selectionSibling = false
    this.selectedUserInput = false
  }

  get error() {
    return this.userValue != null && this.userValue != this.actualValue
  }

  get completed() {
    return this.shown || (this.userValue == this.actualValue)
  }

  isSibling(tile) {
    if(tile == undefined || tile == null) {
      return false
    }
    return (tile.x == this.x || tile.y == this.y) && tile != this
  }

  toggleDraft(value) {
    if(this.shown == false) {
      if(this.userDraftValues.includes(value)) {
        var index = this.userDraftValues.findIndex((n) => n == value)
        this.userDraftValues.splice(index, 1)
      } else {
        this.userDraftValues.push(value)
      }
    }
  }

  toggleValue(to) {
    if(this.shown == false) {
      this.userValue = to == this.userValue ? null : to
    }
  }
}
