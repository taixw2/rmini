//
//  WebViewController+NavigationController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation
import UIKit

extension WebViewController: UIGestureRecognizerDelegate, UINavigationControllerDelegate  {
    /// 导航栏高度
    var navigationHeight: CGFloat {
        guard let navigatorBar = navigationController?.navigationBar else {
            return statusBarHeight
        }
        return statusBarHeight + navigatorBar.frame.height
    }
    
    var statusBarHeight: CGFloat {
        if #available(iOS 13.0, *) {
            return UIApplication.shared.windows.first?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
        } else {
            return UIApplication.shared.statusBarFrame.height
        }
    }
    
    
    func setTitlebar() {
        let TITLEBAR_HEIGHT: Int = 32
        let TITLEBAR_WIDTH: Int = 87
        let titleBarImageView = UIImageView()
        
        titleBarImageView.frame.size = CGSize(width: TITLEBAR_WIDTH, height: TITLEBAR_HEIGHT)
        titleBarImageView.image = UIImage(named: "titlebar")
        
        let buttonView = UIBarButtonItem(customView: titleBarImageView)
        
        let size = CGSize(width: TITLEBAR_WIDTH / 2, height: TITLEBAR_HEIGHT)
        let detailButton = UIButton()
        let closeButton = UIButton()
        
        detailButton.frame.size = size
        
        closeButton.frame.origin = CGPoint(x: size.width, y: 0)
        closeButton.frame.size = size
        
        titleBarImageView.addSubview(detailButton)
        titleBarImageView.addSubview(closeButton)
        
        closeButton.addTargetClosure { _ in
            logger.info("close miniprogram")
        }

        detailButton.addTargetClosure { _ in
            logger.info("show detail")
        }
        
        navigationItem.rightBarButtonItems = [buttonView]
    }
}
