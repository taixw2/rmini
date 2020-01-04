const path = require("path");
const posthtml = require("posthtml");
const fsify = require("./pify").fsify;
const css = require("css");

module.exports = async function(pagePath, projectPath) {
  const htmlTemplate = await fsify.readFile(require.resolve("./template.html"));
  const wxmlPath = path.join(projectPath, pagePath + ".wxml");
  const wxssPath = path.join(projectPath, pagePath + ".wxss");

  if (!await fsify.exists(wxmlPath)) {
    return;
  }

  const wxmlContent = await fsify.readFile(wxmlPath);
  let wxssContent = "";
  if (await fsify.exists(wxssPath)) {
    wxssContent = await fsify.readFile(wxssPath);
  }

  // 解析 CSS
  css.parse(wxssContent);

  // 获取出所有监听的值，在 Vue 中必须先申明
  const reg = /\{\{(.*?)\}\}/g;
  const data = {};
  while (true) {
    const result = reg.exec(wxmlContent);
    if (!result) break;
    data[result[1]] = 0;
  }

  // 编译 wxml, 编译成 web-component 识别的标签
  const postWXML = await posthtml([ require("@rmini/posthtml-rmini-wxml") ]).process(wxmlContent);
  // 替换掉模板中的占位符
  return htmlTemplate
    .replace("<!-- inject wxml -->", postWXML.html)
    .replace("/* inject wxss */", wxssContent)
    .replace("/* inject initData */", `return ${JSON.stringify(data)}`);
};
