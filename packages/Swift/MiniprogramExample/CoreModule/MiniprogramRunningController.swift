//
//  CoreController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import UIKit
import Foundation
import SDDownloadManager
import SSZipArchive
import PKHUD
import JavaScriptCore

class MiniprogramRunningController {
    
    
    /// APPID 作为目录
    var appId = "mock_appid"
    
    /// 小程序解压s后存在的临时目录
    var tempAppDir: String {
        return AppConfig.tempMiniprogramDir.appending(self.appId);
    }
    
    /// 小程序的目录
    var appDir: String {
        return AppConfig.miniprogramDir.appending(self.appId);
    }
    
    func download(_ pkgURL: URL, callback callbackBlock: @escaping (_ error: Error?, _ pkgLocalURL: URL?) -> Void) {
        let fileName = UUID().uuidString.appending(".zip")
        _ = SDDownloadManager.shared.downloadFile(withRequest: URLRequest(url: pkgURL), withName: fileName) { (err, tempURL) in
            if err != nil {
                callbackBlock(err, nil)
                return
            }
            callbackBlock(nil, tempURL)
        }
    }
    
    /// 运行小程序
    /// - Parameter pkgURL: 小程序包地址
    func run(_ appId: String, _ pkgURL: URL) {
        self.appId = appId
        
        download(pkgURL) { (err, localURL) in
            if err != nil {
                HUD.flash(.label("下载小程序失败"), delay: 2.0)
                logger.error(err)
                return
            }
            
            // 解压小程序
            do {
                try SSZipArchive.unzipFile(atPath: localURL!.path, toDestination: AppConfig.tempMiniprogramDir, overwrite: true, password: nil)
            } catch {
                HUD.flash(.label("解包小程序失败"), delay: 2.0)
                logger.error(error.localizedDescription)
                return
            }
            
            var err: Error? = nil;
            // 清空原来的页面
            fs.unlink(file: self.appDir, error: &err)
            fs.mkDir(path: self.appDir, error: &err)
            // 构建&移动到正式目录
            guard let fileList = fs.readDir(path: self.tempAppDir, recursive: true, error: &err) else {
                HUD.flash(.label("解析小程序异常"), delay: 2.0)
                logger.error(err?.localizedDescription ?? "解析小程序异常")
                return
            }
            
            var buildError: Error? = nil;
            for filePath in fileList {
                let fileNameIndex = filePath.index(filePath.startIndex, offsetBy: self.tempAppDir.count)
                let fileName = filePath.suffix(from: fileNameIndex)
                
                if filePath.hasSuffix(".js") {
                    // 移动到指定目录
                    fs.mv(at: filePath, to: self.appDir.appending(fileName), error: &buildError)
                    continue;
                }

                var fileContent = try! String(contentsOfFile: filePath);
                fileContent = fileContent.replacingOccurrences(of: "__SCALE__", with: String(Float(1) / Float(UIScreen.main.scale)))
                fileContent = fileContent.replacingOccurrences(of: "__FONT_SIZE__", with: String(Float(100 / 2 * UIScreen.main.scale)))
                fs.write(file: self.appDir.appending(fileName), data: fileContent.data(using: .utf8)!, error: &buildError)
            }
            
            if buildError != nil {
                LoggerController.shared.error(buildError)
            }
//            // 运行小程序
            MiniprogramShareController.shared.launchApp(appId: appId)
        }
    }
}
