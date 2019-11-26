#!/usr/bin/env node

'use strict';
const path = require('path');
const fs = require('fs');
const compressing = require('compressing');
const posthtml = require('posthtml');
const temp = require('temp');
const os = require('os');
const css = require('css');
const cp = require('child_process');
const pify = require('./pify');

const rdFile = pify(fs.readFile, fs);
const wtFile = pify(fs.writeFile, fs);
const existFs = pify(fs.exists, fs, (resolve) => (existed) => resolve(existed));

async function setup() {
  const projectPath = process.cwd();
  const appConfigPath = path.join(projectPath, 'app.json');

  temp.track(true);

  const dirPath = await temp.mkdir('rmini');
  const tpl = await rdFile(require.resolve('./template.html'));
  const APPJSON = require(require.resolve(appConfigPath));
  const tasks = APPJSON.pages.map(async (pagePath) => {
    const wxmlPath = path.join(projectPath, pagePath + '.wxml');
    const wxssPath = path.join(projectPath, pagePath + '.wxss');
    const targetPath = path.join(dirPath, pagePath.split('/').join('_'));

    const wxmlContent = await rdFile(wxmlPath);
    const wxssExist = await existFs(wxssPath);
    let wxssContent = '';
    if (wxssExist) {
      wxssContent = await rdFile(wxssPath);
    }
    if (wxssContent) {
      css.parse(wxssContent);
    }

    const postWXML = await posthtml([ require('@rmini/posthtml-rmini-wxml') ]).process(wxmlContent);
    const pageHTML = tpl.replace('<!-- inject wxml -->', postWXML.html).replace('/* inject wxss */', wxssContent);
    return wtFile(targetPath, pageHTML);
  });

  await Promise.all(tasks);
  await compressing.zip.compressDir(dirPath, path.join(os.tmpdir(), 'rminiprogram.zip'));
  // TODO： 这里应该上传到服务器然后删除 tempdir
  if (os.platform() === 'darwin') {
    cp.exec(`open ${os.tmpdir()}`);
  }
}

setup();
