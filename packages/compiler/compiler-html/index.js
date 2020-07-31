const path = require("path");
const fs = require("fs");
const { compilerStyle } = require("./compiler-style");
const { compilerJavascript } = require("./compiler-javascript");
const { compilerHtml } = require("./compiler-html");
const cwd = process.cwd();

const template = {
  head: `
  <!DOCTYPE html>
  <html lang="en" style="font-size: __FONT_SIZE__px">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  `,
  body: `
  </head>
  <body>
    <div id="app">
  `,
  foot: `
    </div>
  </body>
  <script type="text/javascript">
  `,
  tail: `
    </script>
  </html>
  `,
};

exports.compilerHtml = function(entryDir, appConfig, projectConfig) {
  if (!appConfig.pages || !appConfig.pages.length) {
    throw new Error('no page fount')
  }

  appConfig.pages.forEach(async (pageEntry) => {
    const wxmlPath = path.join(cwd, pageEntry + ".wxml");
    fs.accessSync(wxmlPath);

    const originalWxmlContent = await fs.promises.readFile(wxmlPath, { encoding: "utf-8" });
    const styleContent = await compilerStyle(pageEntry);
    const scriptContent = await compilerJavascript(originalWxmlContent);
    const wxmlContent = await compilerHtml(originalWxmlContent)

    let content = "";
    content += template.head;
    content += `<style>${styleContent}</style>\n`;
    content += `<script src="https://unpkg.com/@rmini/runtime@${projectConfig.libVersion}"></script>\n`;
    content += template.body;
    content += wxmlContent;
    content += template.foot;
    content += scriptContent;
    content += template.tail;

    const entry = path.join(entryDir, pageEntry)
    try {
      await fs.promises.mkdir(entry, { recursive: true })
    } catch (error) {
      // 
    }

    fs.promises.writeFile(
      path.join(entryDir, pageEntry, "index.html"),
      content,
      "utf-8"
    ).catch(console.error)
  });
};
