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
    
    static func createWebview(appId: String) -> WebViewController {
        let webviewController = WebViewController(appId: appId)
        return webviewController
    }
    
    var webview: WKWebView!
    let appId: String
    
    init(appId: String) {
        self.appId = appId
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let preferences = WKPreferences()
        preferences.javaScriptEnabled = true
        
        let controller = WKUserContentController()
        controller.add(self, name: "error")
        
        let configuration = WKWebViewConfiguration()
        configuration.preferences = preferences
        configuration.userContentController = controller
        
        webview = WKWebView(frame: view.bounds, configuration: configuration)
        webview.uiDelegate = self
        webview.navigationDelegate = self
        view.addSubview(webview)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        setTitlebar()
    }
    
  
    public func load(pagePath: String) {
        var error: Error?
        let htmlContent = ReaderController.shared.readFilecontent(appId: appId, filename: pagePath.appending("/index.html"), error: &error)
        if error != nil {
            logger.error(error)
            return
        }
        
        logger.info(htmlContent)
        webview.loadHTMLString(htmlContent, baseURL: URL(string: "http://localhost"))
    }
    
    public func setData(data: String) {
        //        container.evaluateJavaScript("window.setData(\(data))", completionHandler: nil)
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
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "error":
                let error = (message.body as? [String: Any])?["message"] as? String ?? "unknown"
                logger.error(error)
            default: break
//                assertionFailure("Received invalid message: \(message.name)")
            }
        }
    }
  
    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        logger.info(navigationResponse.response)
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        //        let initData = try! self.webviewModel.initData.toJSON()
        //        setData(data: initData)
    }
    
}
