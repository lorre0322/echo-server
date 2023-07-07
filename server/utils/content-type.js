const path = require("path")
const mime = require("./mime")
const { filePath } = require("../../index")

const getType = (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  let static = url.pathname + url.search
  if (static === '/') static = "/index.html"
  const extName = path.extname(static)
  const contType = mime[extName] || "text/plain"
  const pathName = filePath + static
  return { contType, pathName }
}
module.exports = { getType }