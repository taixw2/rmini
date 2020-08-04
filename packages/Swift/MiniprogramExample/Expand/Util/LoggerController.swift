//
//  LoggerController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation

class LoggerController {
    static let shared: LoggerController = LoggerController()
    private var timeGroup: [String: Int64] = [:]

    /// 输出开发过程中【调试程序】的信息。一般来说，在系统实际运行过程中，这个级别的信息都是不输出的。
    ///
    /// - Parameters:
    ///   - message: 要输出的信息
    ///   - file: 所在文件名
    ///   - funcName: 所在函数名
    ///   - lineNum: 所在行号
    func debug<T>(_ message: T,
                  file: String = #file,
                  funcName: String = #function,
                  lineNum: Int = #line) {
        let fileName = (file as NSString).lastPathComponent
        print("⚪️ [debug]\(fileName):\(lineNum) \(message)")
    }

    /// 输出需要记录的【重要】信息。在这里输出的信息，应该对最终用户具有实际意义，也就是最终用户要能够看得明白是什么意思才行。
    /// 从某种角度上说，Info 输出的信息可以看作是软件产品的一部分（就像那些交互界面上的文字一样），所以需要谨慎对待，不可随便。
    ///
    /// - Parameters:
    ///   - message: 要输出的信息
    ///   - file: 所在文件名
    ///   - funcName: 所在函数名
    ///   - lineNum: 所在行号
    func info<T>(_ message: T,
                 file: String = #file,
                 funcName: String = #function,
                 lineNum: Int = #line) {
        let fileName = (file as NSString).lastPathComponent
        print("🔵[info] \(fileName):\(lineNum) \(message)")
    }

    /// 输出【警告】信息。轻微的错误，不影响程序正常使用。
    ///
    /// - Parameters:
    ///   - message: 要输出的信息
    ///   - file: 所在文件名
    ///   - funcName: 所在函数名
    ///   - lineNum: 所在行号
    func warn<T>(_ message: T,
                 file: String = #file,
                 funcName: String = #function,
                 lineNum: Int = #line) {
        let fileName = (file as NSString).lastPathComponent
        print("🔶[warn] \(fileName):\(lineNum) \(message)")
    }

    /// 输出【错误】信息。可以进行一些修复性的工作，但无法确定系统会正常的工作下去，系统在以后的某个阶段，
    /// 很可能会因为当前的这个问题，导致一个无法修复的错误（例如宕机），但也可能一直工作到停止也不出现严重问题。
    ///
    /// - Parameters:
    ///   - message: 要输出的信息
    ///   - file: 所在文件名
    ///   - funcName: 所在函数名
    ///   - lineNum: 所在行号
    func error<T>(
        _ message: T,
        file: String = #file,
        funcName: String = #function,
        lineNum: Int = #line) {

        let fileName = (file as NSString).lastPathComponent
        print("🔴[error] \(fileName):\(lineNum) \(message)")
    }

    /// 输出【致命错误】信息。可以肯定这种错误已经无法修复，并且如果系统继续运行下去的话，可以肯定必然会越来越乱。
    /// 这时候采取的最好的措施不是试图将系统状态恢复到正常，而是尽可能地保留系统有效数据并停止运行。
    ///
    /// - Parameters:
    ///   - message: 要输出的信息
    ///   - file: 所在文件名
    ///   - funcName: 所在函数名
    ///   - lineNum: 所在行号
    func fatal(
        _ message: String,
        file: String = #file,
        funcName: String = #function,
        lineNum: Int = #line) {
        fatalError("🔴[fatal] \((file as NSString).lastPathComponent):\(lineNum) \(message)")
    }

    func assert(_ assert: Bool, description: String) {
        if !assert {
            fatal(description)
        }
    }

    func time(_ timeFlag: String = "--global--") {
        timeGroup[timeFlag] = Int64(Date().timeIntervalSince1970 * 1000)
    }

    func timeEnd(_ timeFlag: String = "--global--",
                 file: String = #file,
                 funcName: String = #function,
                 lineNum: Int = #line) {
        let fileName = (file as NSString).lastPathComponent
        if let timeStart = timeGroup[timeFlag] {
            let currentTime = Int64(Date().timeIntervalSince1970 * 1000)
            print("🕑 \(fileName):\(lineNum) \(timeFlag):\(currentTime - timeStart)")
            timeGroup.removeValue(forKey: timeFlag)
        }
    }
}

let logger = LoggerController.shared

