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
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var buttonStack: UIStackView!

    let detailVM = LeaveRequestDetailVM()
    let responseVM = RespondLeaveVM()
    
    func render(spinner flag: Bool) {
        buttonStack.isHidden = flag
        spinner.isHidden = !flag
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        // prepare viewmodels
        responseVM.leaveRequestId = leaveRequestID
        responseVM.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                switch $0 {
                case .processing:
                    self?.render(spinner: true)
                case .success:
                    self?.render(spinner: false)
                    self?.pop()
                case .failure(error: let error):
                    self?.render(spinner: false)
                    self?.presentAlert(
                        title: "Error",
                        message: error
                    )
                case nil: ()
                }
            }.store(in: &bag)
        
        detailVM.$leaveRequestDetail.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.render($0) }.store(in: &bag)
        detailVM.fetch(id: leaveRequestID)
        
        // setup UI
        render(nil)
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
        
        let roleId = Int(user?.roleID ?? "4") ?? 4
        
        // status is pending and role is not employee i.e (admin, hr, line manager)
        if (request.status == "pending" && roleId < 4) {
            responseContainer.isHidden = false
        }
    }
    
    @IBAction
    private func didTapReject() {
        responseVM.respond(.init(
            message: responseTextBox.text ?? "", status: .reject
        ))
    }
    
    @IBAction
    private func didTapApprove() {
        responseVM.respond(.init(
            message: responseTextBox.text ?? "", status: .approve
        ))
    }

}
