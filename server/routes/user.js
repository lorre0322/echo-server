const control = require("../control/user-control")
const user = [
  {
    method: "POST",
    url: "/init",
    handler: control.Init,
  },
  {
    method: "POST",
    url: "/login",
    handler: control.Login,
  },
]
module.exports = user