const { msg, convertBody } = require("../utils")
const { verify, verifyToken } = require("../utils/verify")
const { User, Mumbler } = require("../module")
const { getAgent, convertListBody } = require("../utils")
exports.getMumbler = async (req, res) => {
  const { id } = req.params
  const data = await Mumbler.findById(id).lean()
  return data
}
exports.getMumblerList = async (req, res) => {
  const { page } = req.params
  const { page_limit } = await User.findOne({ status: "admin" })
  const data = await Mumbler.find()
    .sort({ top: -1, _id: -1 })
    .skip((page - 1) * page_limit)
    .limit(page_limit).lean()
  const count = await Mumbler.countDocuments()
  const maxpage = Math.ceil(count / page_limit)
  return { data: convertListBody(data), maxpage }
}
exports.saveMumbler = async (req, res) => {
  const { ua, ip } = getAgent(req)
  const { id, date, tag, body, token } = req.body
  console.log({ ua, ip });
  // 验证 权限 | 参数是否空缺
  const { _id } = await User.findOne({ status: "admin" })
  const isToken = await verifyToken(token, _id)
  const ver = verify({ body }, ['body'])
  if (!isToken || ver) return msg()

  // 有id修改，没有添加
  let result = {}
  if (id) {
    result = await Mumbler.updateOne({ _id: id }, { date, tag, body })
  } else {
    result = await new Mumbler({ date, tag, body, ua, ip }).save()
  }
  return msg({ result })
}