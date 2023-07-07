const fs = require("fs")
const path = require("path")
const { User, Album } = require("../module")
const { msg, ConvertImgData } = require("../utils")
const { verify, verifyToken } = require("../utils/verify")
const { getType } = require("../utils/content-type")


exports.static = (req, res) => {
  const { contType, pathName } = getType(req)
  res.type(`${contType};charset=utf-8`)
  // return data
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      res.send("ʕ ˙Ⱉ˙ ʔ file not found !");
    }
    res.send(data)
  });
}
exports.getImg = async (req, res) => {
  const { name } = req.params
  let { contType } = getType(req)
  contType === "text/plain" ? contType = "image/jpg" : contType
  res.type(`${contType};charset=utf-8`)
  // 提取图片base64数据并转换为buffer
  const data = await Album.findOne({ name: path.parse(name).name })
  const base64 = data.img_data.replace(/^data:image\/\w+;base64,/, "")
  const dataBUffer = Buffer.from(base64, 'base64')
  res.send(dataBUffer)
}

exports.getImgList = async (req, res) => {
  let { page, album } = req.params
  const { page_limit } = await User.findOne({ status: "admin" })
  album ? album = { album } : album = {}
  const count = await Album.countDocuments(album)
  let datalist = await Album.find(album, { img_data: 0 })
    .sort({ _id: -1 })
    .skip((page - 1) * page_limit)
    .limit(page_limit).lean()
  const data = ConvertImgData(datalist)
  const maxpage = Math.ceil(count / page_limit)
  return { data, maxpage }
}

exports.addImg = async (req, res) => {
  let { name, album, desc, img_data, token } = req.body
  const config = await User.findOne({ status: "admin" })
  // 验证权限
  const isToken = await verifyToken(token, config._id)
  const ver = verify({ name, img_data }, ['name', 'img_data'])
  if (!isToken || ver || await Album.findOne({ name })) return msg({})
  // 设置默认
  album ? album : album = "daily"
  desc ? desc : desc = "img"
  const image = await new Album({ name, album, desc, img_data }).save()
  return msg({ image })
}