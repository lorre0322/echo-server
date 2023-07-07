const { msg, convertBody } = require("../utils")
const { verify, verifyToken } = require("../utils/verify")
const { User, Article } = require("../module")

exports.getArticleByID = async (req, res) => {
  const { id } = req.params
  const data = await Article.findById(id).lean()
  return convertBody(data)
}

exports.getArticleByTitle = async (req, res) => {
  const { title } = req.params
  const data = await Article.findOne({ title }).lean()
  return convertBody(data)
}
// 修改 | 新增文章
exports.saveArticle = async (req, res) => {
  const { id, token, title, date, category, hide, top, body } = req.body

  // 验证 权限 | 参数是否空缺
  const { _id } = await User.findOne({ status: "admin" })
  const isToken = await verifyToken(token, _id)
  const ver = verify({ title, body }, ['title', 'body'])
  if (!isToken || ver) return msg()

  // 有id修改，没有添加
  let result = {}
  if (id) {
    result = await Article.updateOne({ _id: id }, { title, date, category, hide, top, body })
  } else {
    if (await Article.findOne({ title })) return msg()
    result = await new Article({ title, date, category, hide, top, body }).save()
  }
  return msg({ result })
}

// 获取文章列表
exports.getArticleList = async (req, res) => {
  let { page, category } = req.params
  const { page_limit } = await User.findOne({ status: "admin" })
  category ? category = { category } : category = {}
  const data = await Article.find(category, { body: 0 })
    .sort({ top: -1, _id: -1 })
    .skip((page - 1) * page_limit)
    .limit(page_limit).lean()
  const count = await Article.countDocuments(category)
  const maxpage = Math.ceil(count / page_limit)
  return { data, maxpage }
}