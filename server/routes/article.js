const control = require("../control/article-control")
const article = [
  {
    method: "GET",
    url: "/article/id/:id",
    handler: control.getArticleByID
  },
  {
    method: "GET",
    url: "/article/title/:title",
    handler: control.getArticleByTitle
  },
  {
    method: "GET",
    url: "/article/list/:page/:category?",
    handler: control.getArticleList
  },
  {
    method: "POST",
    url: "/article",
    handler: control.saveArticle
  },
]
module.exports = article