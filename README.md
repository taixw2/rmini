# 一个简单的小程序运行时

## 效果图

![效果图](./des.gif)

## 流程梳理

### 初始化
1. 点开小程序
2. 下载小程序到本地
3. 编译所有的 html, 设置 font-size 以及 viewport
3. 执行小程序的脚本 (main.js)
4. 给脚本发送 init 指令，调用 onLaunch
5. 脚本发送给原生，当前启动的页面 (通过 pageId)
6. 记录当前的 url, 解析后，在第 9 步传入
6. 通过 pageId 找到对应的 html
7. 初始化 webview (渲染 html)
    1. 创建 webviewId, 每一个 webview 都有一个 ID, 一个 page 可能被推入多次，可能存在 多个 webviewId 对应一个 pageId
    2. 给 Html 中注入 webviewId
    3. 把 webviewId 记录到当前栈顶
8. 以 webviewId 和 pageId 作为参数实例化一个 PageController
9. 调用 pageController 的 onLoad
10. 把 webview 推入到路由中
11. 调用 pageController以及 app 的 onShow

### 进入新页面
1. 调用 navigator
2. 调用当前 webviewId 的 onHide 方法
3. 执行初始化第 5-10步 (pageId 就是 navigator 的 url)
4. 调用 pageController 的 onShow

## 退出页面
1. 调用当前 webviewId 的 onUnload 方法
2. 把当前栈 pop
3. 调用当前 webviewId 的 onShow 方法

### 更新
1. 用户触发某个事件 (web component中)
2. 事件转发到原生 (方法名， webviewId, 事件信息)
3. 原生通过 webviewId 派发到对应的 pageController, 并且调用对应的方法
4. pageController 如果调用了 setData, 将 setData 事件派发到原生 (webviewId, data)
5. 原生通过 webviewId 找到对应的 webview, 将 data 采用 Vue.set 传入 (所有的 data 必须在使用前先被 Vue 转换成生命式对象)
6. Vue 更新页面

### 备注
1. webviewId： 用于通信的标识
    1. JSCore 中，用来管理实例化出来的 pageController
    2. 原生中用来管理对象的 WebviewController
    3. webview 中用来与原生通信
2. pageId: 用于找到对应的 html，以及脚本中对应的 PageController
