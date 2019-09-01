Number.prototype.lpad = function (length) {
  var output = this.toString()

  if (output.length < length) {
    output = '0'.repeat(length - output.length) + output
  }
  return output
}

Number.prototype.toTimerDisplay = function () {
  var hoursRemainder = this % 3600
  var hours = (this - hoursRemainder) / 3600
  var minutes = (hoursRemainder - hoursRemainder % 60) / 60
  var seconds = this - (hours * 3600 + minutes * 60)

  return `${hours.lpad(2)}:${minutes.lpad(2)}:${seconds.lpad(2)}`
}
