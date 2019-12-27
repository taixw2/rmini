#!/usr/bin/env node

"use strict";
const path = require("path");
const compressing = require("compressing");
const os = require("os");
const cp = require("child_process");
const fsify = require("./pify").fsify;
const combinHTML = require("./combinHTML");
const bundlejs = require("@rmini/bundlejs");

async function setup() {
  const projectDirPath = process.cwd();
  const tempMiniprogramDirPath = path.join(os.tmpdir(), "mock_appid");

  try {
    // 创建一个临时目录，目录名可以使用 appId
    if (await fsify.exists(tempMiniprogramDirPath)) {
      await fsify.rmDir(tempMiniprogramDirPath, { recursive: true });
    }
    await fsify.mkdir(tempMiniprogramDirPath);

    // app.json 路径
    const appConfig = require(path.join(projectDirPath, "app.json"));
    const tasks = appConfig.pages.map(async (pagePath) => {
      const htmlContent = await combinHTML(pagePath, projectDirPath);
      // 写入到指定文件
      return fsify.writeFile(
        path.join(tempMiniprogramDirPath, pagePath.split("/").join("_")) + ".html",
        htmlContent,
      );
    });

    // 编译HTML 和 javascript
    await Promise.all([
      Promise.all(tasks),
      bundlejs(projectDirPath, path.join(tempMiniprogramDirPath, "main.js")),
    ]);

    // 打包成 zip
    await compressing.zip.compressDir(tempMiniprogramDirPath, path.join(os.tmpdir(), "rminiprogram.zip"));
    // TODO：调试
    if (os.platform() === "darwin") {
      cp.exec(`serve ${os.tmpdir()}`);
      console.log("TCL: setup -> os.tmpdir()", os.tmpdir());
    }
  } catch (error) {
    console.error(error);
  }
}

setup();
