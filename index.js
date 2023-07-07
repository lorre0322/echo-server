const path = require("path")
module.exports = {
  filePath: path.join(__dirname, `./public`)
}
require("./server/app")