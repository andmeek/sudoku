Array.prototype.clone = function() {
  return [...this]
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
