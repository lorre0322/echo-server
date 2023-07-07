const { ConvertImgData, convertBody, convertListBody } = require("./convert-body")
const { getAgent } = require("./user-agent")

function msg(obj) {
  obj = obj || {}
  JSON.stringify(obj) === "{}" ? obj.msg = "failed" : obj.msg = "success"
  return obj
}

module.exports = {
  msg,
  ConvertImgData, convertBody, convertListBody,
  getAgent
}