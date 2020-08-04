//
//  UIButtion.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//
//  @https://medium.com/@jackywangdeveloper/swift-the-right-way-to-add-target-in-uibutton-in-using-closures-877557ed9455

import UIKit
import Foundation

typealias UIButtonTargetClosure = (UIButton) -> Void

class ClosureWrapper: NSObject {
    let closure: UIButtonTargetClosure
    init(_ closure: @escaping UIButtonTargetClosure) {
        self.closure = closure
    }
}

extension UIButton {
    private struct AssociatedKeys {
        static var targetClosure = "targetClosure"
    }
    private var targetClosure: UIButtonTargetClosure? {
        get {
            guard let closureWrapper = objc_getAssociatedObject(self, &AssociatedKeys.targetClosure) as? ClosureWrapper else {
                return nil
            }
            return closureWrapper.closure
        }
        set(newValue) {
            guard let newValue = newValue else { return }
            objc_setAssociatedObject(self,
                                     &AssociatedKeys.targetClosure,
                                     ClosureWrapper(newValue),
                                     objc_AssociationPolicy.OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }
    func addTargetClosure(event: UIControl.Event = .touchUpInside,
                          closure: @escaping UIButtonTargetClosure) {
        targetClosure = closure
        addTarget(self,
                  action: #selector(UIButton.closureAction),
                  for: event)
    }
    @objc func closureAction() {
        guard let targetClosure = targetClosure else { return }
        self.isEnabled = false
        targetClosure(self)
        self.isEnabled = true
    }
}

