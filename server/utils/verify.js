const jwt = require('jsonwebtoken')
const SECRET = process.env.ECHO_SECRET || "ECHO"
function jwtSign(payload, secret, options) {
  return jwt.sign(payload, secret, options)
}
// 以公钥和密钥计算出解码令牌字符串
function jwtVerify(token, secret) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return { msg: 'Token overdue' }
        case 'JsonWebTokenError':
          return { msg: 'Token invalid' }
      }
    }
    return decoded
  })
}

// 验证参数
function verify(body, params) {
  for (const param of params) {
    if (!body[param]) {
      console.log(`${param} is not legal`);
      return `${param}`
    }
  }
}

function verifyToken(token, id) {
  const data = jwtVerify(token, SECRET)
  if (data.msg) return false
  if (data.id) {
    const condition = data.id === id.toString()
    if (condition) return true
    return false
  }
}
module.exports = { SECRET, jwtSign, jwtVerify, verify, verifyToken }
