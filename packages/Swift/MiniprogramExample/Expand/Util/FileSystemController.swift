//
//  FileSystemController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//


import Foundation

/// 文件管理系统
let fs = FileSystemController.shared

final class FileSystemController {
    static let shared = FileSystemController()
    private let fileSystem = FileManager.default
    private init() {}
    
    
    /// 写入内容到指定m文件
    /// - Parameter file: 文件路径
    /// - Parameter data: 数据
    /// - Parameter error: 异常
    func write(file: String, data: Data, error: inout Error?) {
        mkDir(path: getDirectory(file: file), error: &error)
        if error != nil { return }
        do {
            try data.write(to: URL(fileURLWithPath: file))
        } catch let err {
            error = err
        }
    }
    
    
    /// q读取指定文件的内容
    /// - Parameter file: 文件路径
    /// - Parameter error: 异常
    func read(file: String, error: inout Error?) -> Data? {
        do {
            return try Data(contentsOf: URL(fileURLWithPath: file))
        } catch let err {
            error = err
            return nil
        }
    }
    
    
    /// 创建目录
    /// - Parameter path: 目录名称
    /// - Parameter error: 异常
    func mkDir(path: String, error: inout Error?) {
        guard !fileSystem.fileExists(atPath: path) else { return }
        do {
            try fileSystem.createDirectory(
                at: URL(fileURLWithPath: path),
                withIntermediateDirectories: true,
                attributes: nil)
        } catch let err {
            error = err
        }
    }
    
    
    /// 读取路径下的文件
    /// - Parameter path: 路径
    /// - Parameter error: 异常
    func readDir(path: String, error: inout Error?) -> [String]? {
        do {
            return try fileSystem.contentsOfDirectory(atPath: path)
        } catch let err {
            error = err
            return nil
        }
    }
    
    
    /// 读取路径下的文件
    /// - Parameter path: 路径
    /// - Parameter error: 异常
    func readDir(path: String, recursive: Bool, error: inout Error?) -> [String]? {
        do {
            if (recursive) {
                let url = URL(fileURLWithPath: path)
                var files = [String]()
                if let enumerator = FileManager.default.enumerator(at: url, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles, .skipsPackageDescendants]) {
                    for case let fileURL as URL in enumerator {
                        do {
                            let fileAttributes = try fileURL.resourceValues(forKeys:[.isRegularFileKey])
                            if fileAttributes.isRegularFile! {
                                files.append(fileURL.path)
                            }
                        } catch { print(error, fileURL) }
                    }
                    return files
                }
            }
            return try fileSystem.contentsOfDirectory(atPath: path)
        } catch let err {
            error = err
            return nil
        }
    }
    
    
    /// 移动文件到指定l路径
    /// - Parameter atPath: 文件所在路径
    /// - Parameter toPath: 文件将要移动到的路径
    /// - Parameter error: 异常
    func mv(at atPath: String,to toPath: String, error: inout Error?) {
        let toPathDir = getDirectory(file: toPath)
        mkDir(path: toPathDir, error: &error)
        do {
            try fileSystem.moveItem(at: URL(fileURLWithPath: atPath), to: URL(fileURLWithPath: toPath))
        } catch let err {
            error = err
        }
    }
    
    func unlink(file: String, error: inout Error?) {
        do {
            try fileSystem.removeItem(at: URL(fileURLWithPath: file))
        } catch let err {
            error = err
        }
    }
    
    
    /// 文件是否存在
    /// - Parameter file: 文件路径
    func exists(file: String) -> Bool {
        return fileSystem.fileExists(atPath:file)
    }
    
    /// 获取文件路径： abc/abc.p => abc/
    /// - Parameter file: 文件路径
    func getDirectory(file: String) -> String {
        let nsfile = NSString(string: file)
        return nsfile.deletingLastPathComponent
    }
    
    
    /// m文件所在的目录是否存在
    /// - Parameter file: 文件路径
    func directoryExists(file: String) -> Bool {
        let directory = getDirectory(file: file)
        return exists(file:directory)
    }
}

