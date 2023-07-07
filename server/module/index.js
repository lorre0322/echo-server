const { mongoose, Schema, model } = require("mongoose");
const blogDB = process.env.MONGODB_URL
const albumDB = process.env.MONGODB_URL2 || process.env.MONGODB_URL
const dbName = "echo"
const blog = mongoose.createConnection(`${blogDB}/${dbName}`)
const album = mongoose.createConnection(`${albumDB}/${dbName}`)

// 取消mongoose的版本号记录
const option = { versionKey: false, virtuals: true }

const User = blog.model("echo_user", new Schema({
  username: String,
  password: String,
  website: String,
  status: String,
  email: String,
  page_limit: Number,
  comment_limit: Number,
  smtp_url: String,
  smtp_port: Number,
  smtp_psw: String
}, option));

const Mumbler = blog.model("echo_mumbler", new Schema({
  date: Number,
  tag: String,
  body: String,
  ua: {
    browser: String,
    os: String
  },
  ip: {
    ip: String,
    place: String
  }
}, option));

const Article = blog.model("echo_article", new Schema({
  title: String,
  date: Number,
  category: String,
  top: Boolean,
  hide: Boolean,
  body: String,
}, option));

const Album = album.model("echo_album", new Schema({
  name: String,
  album: String,
  desc: String,
  img_data: String
}, option));


module.exports = {
  User,
  Mumbler,
  Article,
  Album
}