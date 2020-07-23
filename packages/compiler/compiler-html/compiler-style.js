const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const pxtorem = require("postcss-plugin-px2rem");
const { builtInComponents } = require("../utils/constants");
const cwd = process.cwd();

const renameTag = postcss.plugin("postcss-rename-tag", () => {
  return (root) => {
    root.walkRules((rule) => {
      rule.selector = rule.selectors
        .map((item) => {
          return item
            .split(/\s+/)
            .map((selector) => {
              return /^\w/.test(selector) &&
                builtInComponents.includes(selector)
                ? "wx-" + selector
                : selector;
            })
            .join(" ");
        })
        .join(",");
    });
  };
});

// TODO: 把不支持的删除
exports.compilerStyle = async function(pageEntry) {
  // TODO: 合并 global.css

  const wxssPath = path.join(cwd, pageEntry + ".wxss");
  try {
    await fs.promises.access(wxssPath);
  } catch (error) {
    return "";
  }

  const content = await fs.promises.readFile(wxssPath, { encoding: "utf-8" });
  return postcss([pxtorem({ rootValue: 100 }), renameTag()]).process(content)
    .css;
};
