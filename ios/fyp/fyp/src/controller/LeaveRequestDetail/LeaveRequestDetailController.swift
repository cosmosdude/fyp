//
//  LeaveRequestDetailController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit
import Combine

class LeaveRequestDetailController: UIViewController {
    
    var bag = Set<AnyCancellable>()
    
    @IBOutlet private var navBar: NavBarView!
    
    var leaveRequestID: String = ""
    
    private let user = UserModel.user
    
    @IBOutlet private var leaveTypeBox: SelectBox!
    @IBOutlet private var fromBox: SelectBox!
    @IBOutlet private var toBox: SelectBox!
    @IBOutlet private var typeBox: SelectBox!
    
    @IBOutlet private var statusBox: SelectBox!
    
    @IBOutlet private var requestFromBox: SelectBox!
    @IBOutlet private var reasonBox: TextBox!
    
    @IBOutlet private var requestToBox: SelectBox!
    @IBOutlet private var responseBox: TextBox!
    
    @IBOutlet private var responseContainer: UIView!
    @IBOutlet private var responseTextBox: TextBox!

    let detailVM = LeaveRequestDetailVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        detailVM.fetch(id: leaveRequestID)
        render(nil)
        
        detailVM.$leaveRequestDetail.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.render($0) }.store(in: &bag)
    }
    
    private func render(_ request: LeaveRequest?) {
        responseContainer.isHidden = true
        
        guard let request else { return }
        
        leaveTypeBox.text = request.leaveName
        
        let f = DateFormatter()
        f.dateFormat = "d MMM, yyyy"
        
        fromBox.text = request.from.map(f.string(from:))
        toBox.text = request.to.map(f.string(from:))
        let type = request.halfday ?? ""
        typeBox.text = type.isEmpty ? "Entire Day" : type
        
        statusBox.text = request.status.capitalized
        
        requestFromBox.setImageURL(request.requesterAvatarURL)
        requestFromBox.text = request.requesterFullName
        
        reasonBox.text = request.requestMsg ?? "No Reason"
        
        requestToBox.setImageURL(request.recipientAvatarURL)
        requestToBox.text = request.recipientFullName
        
        responseBox.text = request.responseMsg
        responseBox.isHidden = request.responseMsg?.isEmpty ?? true
        
        if (request.status == "pending") {
            responseContainer.isHidden = false
        }
    }
    
    @IBAction
    private func didTapReject() {
        
    }
    
    @IBAction
    private func didTapApprove() {
        
    }

}
