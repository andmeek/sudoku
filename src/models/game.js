export default class Game {
  constructor() {
    this.board = null
    this._currentInput = null
    this.difficulty = null
    this.draftMode = false
    this.eraserMode = false
    this.seed = null
    this.showAllNotes = false
    this.timer = 0
  }

  get completed() {
    return this.board && this.board.completed
  }

  get currentInput() {
    return this._currentInput
  }

  set currentInput(to) {
    if(!this.board.numberCompleted(to)) {
      this._currentInput = to == this._currentInput ? null : to
    }

    if(this.eraserMode && this._currentInput > 0) {
      this.eraserMode = false
    }

    if(to == 0) {
      this._currentInput = null
      this.eraserMode = !this.eraserMode
    }
  }

  incrementTimer() {
    this.timer += 1
  }
}
