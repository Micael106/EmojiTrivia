const L1 = require("../levels/1")

exports.getLevelData = function(level) {
  var data = eval('L'+level)
  return data
}