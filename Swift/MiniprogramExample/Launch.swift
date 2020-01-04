//
//  Launch.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation
import SDDownloadManager

class Launch {
    
    static let shared: Launch = Launch()
    
    func launch() {
        logger.info("当前 home 目录: \(System.homeDirectory)")
        logger.info("当前 小程序 目录: \(AppConfig.miniprogramDir)")
        logger.info("当前 小程序依赖 目录: \(AppConfig.libraryDir)")
        
        var error: Error? = nil
        fs.mkDir(path: AppConfig.miniprogramDir, error: &error);
        fs.mkDir(path: AppConfig.tempMiniprogramDir, error: &error);
        fs.mkDir(path: AppConfig.libraryDir, error: &error);
        
        // 依赖
        // vue
        let vue = try! String(contentsOf: URL(string: "https://cdn.jsdelivr.net/npm/vue")!, encoding: .utf8)
        let wcp = try! String(contentsOf: URL(string: "http://10.0.3.52:9990/build/index.js")!, encoding: .utf8)
        
        var err: Error? = nil
        fs.write(file: AppConfig.libraryDir.appending("vue.js"), data: vue.data(using: .utf8)!, error: &err)
        fs.write(file: AppConfig.libraryDir.appending("webcomponent.js"), data: wcp.data(using: .utf8)!, error: &err)
        
        print(err ?? "正常")
        print(error ?? "正常")
    }
}
