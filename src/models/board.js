import Tile from './tile.js'

export default class Board {
  constructor(grid) {
    this.grid = grid
    this.tiles = []
    this._tilesById = {}

    for(var y = 0; y < grid.values.length; y++) {
      for(var x = 0; x < grid.values[y].length; x++) {
        let id = this.tiles.length + 1

        var tile = new Tile(id, x, y, this.grid.value(x, y), this.grid.state(x, y) == 1)
        this.tiles.push(tile)
        this._tilesById[id] = tile
      }
    }
  }

  get completed() {
    return this.tiles.reduce((tot, tile) => {
        return tot && tile.completed
    })
  }

  numberCompleted(number) {
    return this.tiles.filter((tile) => {
      return tile.actualValue == number && tile.completed
    }).length == 9
  }

  tileAt(x, y) {
    for(var i in this.tiles) {
      if(this.tiles[i].x == x && this.tiles[i].y == y) {
        return this.tiles[i]
      }
    }

    return null
  }

  tilesAtSection(x, y) {
    let baseX = x * 3, baseY = y * 3, maxX = baseX + 2, maxY = baseY + 2
    var ret = []
    for(var i in this.tiles) {
      var tile = this.tiles[i]
      if(tile.x >= baseX && tile.x <= maxX && tile.y >= baseY && tile.y <= maxY) {
        ret.push(tile)
      }
    }
    return ret
  }

  tileById(id) {
    return this._tilesById[id] || null
  }
}
