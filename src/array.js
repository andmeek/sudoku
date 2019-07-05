Array.prototype.clone = function() {
  return [...this].map((item) => {
    return Array.isArray(item) ? item.clone() : item
  })
}

Array.prototype.distinct = function() {
  return this.filter((value, index) => {
    return this.indexOf(value) === index
  })
}

Array.prototype.flat = function() {
  return this.reduce((flat, toFlatten) => {
    return flat.concat(toFlatten)
  }, [])
}

Array.prototype.randomItem = function() {
  var rand = Math.floor(Math.random() * this.length)
  return this[rand]
}

Array.prototype.removeItem = function(item) {
  var index = this.findIndex((v) => v == item)
  if(index > -1) {
    this.splice(index, 1)
  }
}

Array.prototype.shuffleSeed = function(seed = 0) {
  var random = Math.sin(seed) * 10000
  var seededRandom = random - Math.floor(random)

  var j, i
  for (i = this.length - 1; i > 0; i--) {
    j = Math.floor(seededRandom * (i + 1));
    var x = this[i];
    this[i] = this[j]
    this[j] = x
  }
  return this
}
