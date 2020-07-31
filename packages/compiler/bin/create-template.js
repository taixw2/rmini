const fs = require("fs");
const { join } = require("path");
const { tmpdir } = require("os");
const { createTempAppId } = require("../utils/utils");
const cwd = process.cwd();

exports.createTemplateEntry = async function (projectConfig) {
    let appId = projectConfig.appid

    if (process.env.NODE_ENV === 'development') {
        appId = appId || createTempAppId()
    }

    const tempEntryDir = join(tmpdir(), appId);
    try {
        await fs.promises.access(tempEntryDir)
        await fs.promises.rmdir(tempEntryDir, { recursive: true })
    } catch (error) {
        // 
    }
    await fs.promises.mkdir(tempEntryDir)
    return tempEntryDir
};
