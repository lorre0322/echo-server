const { User } = require("../module")
const { msg } = require("../utils")
const sendmail = require("../utils/sendmail")
const bcrypt = require("bcrypt")
const { SECRET, jwtSign, verify, verifyToken } = require("../utils/verify")

exports.Init = async (req, res) => {
  const { username, password, email, website } = req.body
  const noEmpty = (await User.find()).length
  if (noEmpty) {
    return msg()
  } else {
    const option = {
      username,
      password: bcrypt.hashSync(password, 8),
      website: website || "echo blog",
      email,
      status: "admin",
      page_limit: 5,
      comment_limit: 5,
      smtp_url: process.env.SMTP_URL || "smtp.qq.com",
      smtp_port: process.env.SMTP_PORT || 465,
      smtp_psw: process.env.SMTP_PSW || ""
    }
    const admin = await new User(option).save()
    if (admin && option.smtp_psw) await sendmail("注册成功", option.email, {})
    return msg({ admin })
  }
}
exports.Login = async (req, res) => {
  let { username, password, token } = req.body
  const config = await User.findOne({ status: "admin" })
  // 如果有token则验证token并返回
  if (token) {
    const isToken = await verifyToken(token, config._id)
    if (!isToken) return await msg()
    return msg({ token })
  }
  const usePassword = verify({ username, password }, ['username', 'password'])
  const isUsername = username === config.username
  const isPassword = bcrypt.compareSync(password, config.password)
  if (usePassword || !isUsername || !isPassword) return await msg()
  token = jwtSign({ id: config._id.toString() }, SECRET, { expiresIn: '7d' })
  return msg({ token })
}