const UAParser = require("ua-parser-js")
// 静态地址库
const IPDB = require('ipdb');
const qqwry_ipdb = require('qqwry.ipdb');
const ipdb = new IPDB(qqwry_ipdb);

function getAgent(req) {
  const parser = new UAParser(req.headers['user-agent']).getResult();
  const ua = { browser: parser.browser.name, os: parser.os.name }
  const add = ipdb.find(req.socket.remoteAddress).data
  const ip = {
    ip: req.socket.remoteAddress,
    place: add.city_name || add.region_name || add.country_name
  }
  return { ua, ip }
}
module.exports = { getAgent }
