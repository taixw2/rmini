//
//  ContentView.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/4.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import SwiftUI

struct ContentView : View {
    @State var appId: String = "wxa2feca6b7cce2b49"
    
    // 小程序远程路径， 通过 appId 获取
    @State var sourceBaseApi: String = "http://192.168.31.74:5000/"
    
    var body: some View {
        VStack {
            VStack {
                VStack(alignment: .leading) {
                    Text(verbatim: "流程：")
                    Text(verbatim: "1. 读取小程序 appId：")
                    Text(verbatim: "2. 从服务器下载小程序包到本地：")
                    Text(verbatim: "3. 设置小程序的高清方案 font-size & viewport：")
                    Text(verbatim: "4. 创建 JSContext, 并且注入方法")
                    Text(verbatim: "5. 执行小程序的 Javascript")
                    Text(verbatim: "6. 获取小程序的首页，并且读取 HTML")
                    Text(verbatim: "7. 创建 webview 实例，并且渲染 HTML")
                    Text(verbatim: "8. 实例化一个 PageController， 并将 data 传给 webview")
                }
                TextField("获取小程序地址", text: $sourceBaseApi)
                .disabled(true)
                .padding(.all)
                .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0))
                TextField("请输入你要打开的小程序 appId", text: $appId)
                    .disabled(true)
                    .padding(.all)
                    .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0))
                VStack {
                    Button(action: {
                        let miniprogramZipURL = self.sourceBaseApi.appending(self.appId).appending(".zip")
                        MiniprogramRunningController().run(self.appId, URL(string: miniprogramZipURL)!)
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

