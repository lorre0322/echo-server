const nodemailer = require('nodemailer');
const { User } = require("../module")
const template = require("./template")
module.exports = async (title, to, params) => {
  const {
    username, email, website, smtp_url, smtp_port, smtp_psw
  } = await User.findOne({ status: "admin" })
  let html = ""
  switch (title) {
    case title = "注册成功":
      html = await template.init({ username, email, website })
      break;
    default:
      break;
  }
  // 发送者
  const sender = nodemailer.createTransport({
    // service: 'QQ',
    host: smtp_url,
    port: smtp_port,
    secureConnection: true,
    auth: {
      user: email,
      pass: smtp_psw,
    }
  });
  // 设置
  const options = {
    from: `"${username}" <${email}>`, // 发送者昵称和地址
    to: to, // 接收者的邮箱地址
    subject: `${website} | ${title}`, // 邮件主题
    html
  };
  // 发送邮件
  sender.sendMail(options, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('邮件发送成功 ID：', info.messageId);
  });
}