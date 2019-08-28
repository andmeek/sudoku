export default class Game {
  constructor() {
    this.board = null
    this.currentInput = null
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

  incrementTimer() {
    this.timer += 1
  }
}
