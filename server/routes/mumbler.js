const control = require("../control/mumbler-control")
const mumbler = [
  {
    method: "GET",
    url: "/mumbler/:id",
    handler: control.getMumbler
  },
  {
    method: "GET",
    url: "/mumbler/list/:page",
    handler: control.getMumblerList
  },
  {
    method: "POST",
    url: "/mumbler",
    handler: control.saveMumbler
  },
]
module.exports = mumbler