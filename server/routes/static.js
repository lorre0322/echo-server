const control = require("../control/static-control")
const static = [
  {
    method: "GET",
    url: "/:",
    handler: control.static,
  },
  {
    method: "GET",
    url: "/img/:name",
    handler: control.getImg,
  },
  {
    method: "POST",
    url: "/img",
    handler: control.addImg,
  },
  {
    method: "GET",
    url: "/img/list/:page/:album?",
    handler: control.getImgList,
  },
]
module.exports = static