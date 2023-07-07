const marked = require("marked");
const { gfmHeadingId } = require("marked-gfm-heading-id");
marked.use({
  mangle: false,
  headerIds: false,
});
marked.use(gfmHeadingId())

function ConvertImgData(datas) {
  for (const data of datas) {
    data.id = data._id
    delete data._id
  }
  return datas
}

function convertBody(data) {
  data.body = marked.parse(data.body)
  data.id = data._id.toString()
  delete data._id
  return data
}
function convertListBody(datas) {
  for (const data of datas) {
    data.id = data._id
    delete data._id
    data.body = marked.parse(data.body)
  }
  return datas
}
module.exports = {
  ConvertImgData, convertBody, convertListBody
}