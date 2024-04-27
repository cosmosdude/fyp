//
//  DimmingBackgroundPresentationController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 27/4/24.
//

import Foundation
import UIKit
    
public final class DimmingBackgroundPresentationController: UIPresentationController {
    let overlayView = UIView()
    
    public override init(
        presentedViewController: UIViewController,
        presenting presentingViewController: UIViewController?
    ) {
        super.init(presentedViewController: presentedViewController, presenting: presentingViewController)
    }
}

extension DimmingBackgroundPresentationController {
    
    public override var presentationStyle: UIModalPresentationStyle {
        .overFullScreen
    }
    
    public override var adaptivePresentationStyle: UIModalPresentationStyle {
        self.presentationStyle
    }
    
    public override func presentationTransitionWillBegin() {
        
        guard let containerView else { return }
        containerView.insertSubview(overlayView, at: 0)

        overlayView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            overlayView.topAnchor.constraint(
                equalTo: containerView.topAnchor
            ),
            overlayView.leadingAnchor.constraint(
                equalTo: containerView.leadingAnchor
            ),
            overlayView.bottomAnchor.constraint(
                equalTo: containerView.bottomAnchor
            ),
            overlayView.trailingAnchor.constraint(
                equalTo: containerView.trailingAnchor
            ),
        ])
        overlayView.backgroundColor = .clear
        
        guard let coordinator = presentedViewController
            .transitionCoordinator
        else {  return }
        coordinator.animate { [overlayView] _ in
            overlayView.backgroundColor = .black
                .withAlphaComponent(0.5)
        } completion: { [overlayView] _ in
            overlayView.backgroundColor = .black
                .withAlphaComponent(0.5)
        }
    }
    
    
    
    public override func dismissalTransitionWillBegin() {
        guard let coordinator = presentedViewController
            .transitionCoordinator
        else {  return }
        coordinator.animate { [overlayView] _ in
            overlayView.backgroundColor = .clear
        }
    }
    
    public override func dismissalTransitionDidEnd(_ completed: Bool) {
        overlayView.removeFromSuperview()
    }
}
