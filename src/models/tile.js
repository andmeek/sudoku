export default class Tile {
  constructor(x, y, actualValue, userEditable = false) {
    this.actualValue = actualValue
    this.userDrafts = []
    this.userEditable = userEditable
    this.userValue = null
    this.x = x
    this.y = y
  }

  get error() {
    return this.userValue != null && this.userValue != this.actualValue
  }

  get completed() {
    if(this.userEditable) {
      return this.userValue == this.actualValue
    }

    return true
  }

  get value() {
    if(this.userEditable) {
      return this.userValue
    } else {
      return this.actualValue
    }
  }

  isSibling(withTile) {
    if(withTile == undefined || withTile == null || withTile == this) {
      return false
    }

    return this.x == withTile.x || this.y == withTile.y
  }

  toggleDraft(value) {
    if(this.userDrafts.includes(value)) {
      var index = this.userDrafts.findIndex((n) => n == value)
      this.userDrafts.splice(index, 1)
    } else {
      this.userDrafts.push(value)
    }
  }

  toggleValue(to) {
    this.userValue = to == this.userValue ? null : to
  }
}
