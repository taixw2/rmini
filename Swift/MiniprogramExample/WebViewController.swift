//
//  WebViewController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/4.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import UIKit
import WebKit

// setData 通知原生，再通知 webview 的 setData

class WebViewController: UIViewController {
    
    var container: WKWebView!
    
    let webviewModel: WebViewModel
    
    init(webviewModel: WebViewModel) {
        self.webviewModel = webviewModel
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        initWebview()
        
        container.loadHTMLString(webviewModel.html , baseURL: Bundle.main.bundleURL)
        webviewModel.onLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        webviewModel.onShow()
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        webviewModel.onHide()
    }
    
    deinit {
        webviewModel.onUnload()
    }
    
    /// 初始化 webview
    private func initWebview() {
        let configuration = WKWebViewConfiguration()
        let preferences = WKPreferences()
        preferences.javaScriptEnabled = true
        configuration.preferences = preferences
        configuration.userContentController.add(self, name: "logger")
        configuration.userContentController.add(self, name: "triggerEvent")
        container = WKWebView(frame: view.bounds, configuration: configuration)
        container.uiDelegate = self
        container.navigationDelegate = self
        
        view.addSubview(container)
    }
    
    public func setData(data: String) {
        container.evaluateJavaScript("window.setData(\(data))", completionHandler: nil)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
}

extension WebViewController: WKScriptMessageHandler, WKNavigationDelegate, WKUIDelegate  {
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "logger" {
            logger.info("webview JS log： \(message.body as! String)")
            return
        }
        
        if message.name == "triggerEvent" {
            // 通知 jsContext 对应的页面执行对应的方法
            self.webviewModel.callMethod(event: message.body as! String)
            return
        }
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let initData = try! self.webviewModel.initData.toJSON()
        setData(data: initData)
    }
    
}
