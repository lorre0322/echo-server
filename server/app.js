// 环境变量
require('dotenv').config();
const PORT = process.env.PORT || 4000
const VERSION = require('../package.json').version;
const { Admin } = require("./module")

const app = require("fastify")({ bodyLimit: 5242880 });
// 路由 静态 | 碎碎念 | 文章 | 用户
const static = require("./routes/static");
const user = require("./routes/user");
const mumbler = require("./routes/mumbler");
const article = require("./routes/article");
const Router = [...static, ...user, ...article, ...mumbler]
// console.log(Router);
// 跨域
const cors = require('@fastify/cors')
app.register(cors, { origin: "*" })

async function service() {
  console.time('路由注册');
  Router.forEach((route) => {
    app.route(route);
  });
  await app.listen({ port: PORT, host: "0.0.0.0" }, () => {
    console.log('\x1B[44m%s\x1B[0m', ' ➪ echo api  ', `version ${VERSION}`)
    console.log('\x1B[44m%s\x1B[0m', ` ➪ service runing in PORT ${PORT}`);
  })
  console.timeEnd('路由注册');
}

service()