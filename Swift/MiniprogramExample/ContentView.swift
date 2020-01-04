//
//  ContentView.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/4.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import SwiftUI

struct ContentView : View {
    @State var appId: String = "wxc8ecefecf650b4ff"
    
    @State var appURL: String = "http://10.0.3.52:3838/rminiprogram.zip"
    
    var body: some View {
        VStack {
            TextField("获取小程序地址", text: $appURL)
                .disabled(true)
                .padding(.all)
                .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0))
            VStack {
                TextField("获取小程序的 appId", text: $appId)
                    .disabled(true)
                    .padding(.all)
                    .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0))
                VStack {
                    Button(action: {
                        MiniprogramRunningController().run(self.appId, URL(string: self.appURL)!)
                    }) {
                        Text("打开小程序")
                    }
                    .padding(.all)
                }
            }
        }
        .padding(.horizontal, 15)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}


// 打开一个 webview (loading)
// 小程序处理类
// 如果存在资源， 则直接使用，否则先下载资源
// 小程序类执行 javascript
// 小程序类通过 javascript 当前的页面给 webview 渲染
// 调用 javascript 的 app 的 onLaunch 生命周期
// 隐藏 Loading
// 调用 javascript 的 app 的 onShow 生命周期
// 点击页面跳转到下一页
// 调用 navigationController.pushViewController 进入下一页
// 找到 javascript 中对应 page
// 执行 willShow
// 把小程序页面的内容给 webview 渲染
// webview 调用事件，传递给他 javascript

