//
//  OvertimeRequestDetailController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit
import Combine

class OvertimeRequestDetailController: UIViewController {
    
    @IBOutlet private var navBar: NavBarView!
    
    @IBOutlet private var dateBox: SelectBox!
    @IBOutlet private var durationBox: SelectBox!
    
    @IBOutlet private var statusBox: SelectBox!
    
    @IBOutlet private var requestFromBox: SelectBox!
    @IBOutlet private var reasonBox: TextBox!
    
    @IBOutlet private var requestToBox: SelectBox!
    @IBOutlet private var responseBox: TextBox!
    
    @IBOutlet private var responseContainer: UIView!
    @IBOutlet private var responseTextBox: TextBox!
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var buttonStack: UIStackView!
    @IBOutlet private var offInLieuButton: UIButton!
    
    var bag = Set<AnyCancellable>()
    
    private let user = UserModel.user
    var id: String = ""
    let detailVM = OTRequestDetailVM()
    let responseVM = RespondOTVM()
    let leaveVM = LeaveVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        detailVM.id = id
        detailVM.fetchDetail()
        
        responseVM.id = id
        
        detailVM.$detail.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.render($0) }.store(in: &bag)
        
        responseVM.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.buttonStack.isHidden = $0?.isProcessing ?? false
                self?.spinner.isHidden = !($0?.isProcessing ?? false)
                switch $0 {
                case .success:
                    self?.pop()
                case .failure(let error):
                    self?.presentAlert(
                        title: "Error",
                        message: error
                    )
                default: ()
                }
            }.store(in: &bag)
        
        leaveVM.$leaveTypes.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.showHideOffInLieu($0)
            }.store(in: &bag)
        leaveVM.fetchLeaveTypes()
    }
    
    private func showHideOffInLieu(_ types: [LeaveType]) {
//        let types = leaveVM.leaveTypes
        let earnable = types.filter { $0.earnable == 1 }.first
        offInLieuButton.isHidden = earnable == nil
    }
    
    private func render(_ request: OTRequest?) {
        responseContainer.isHidden = true
        
        guard let request else { return }
        let f = DateFormatter()
        f.dateFormat = "d MMM, yyyy"
        
        dateBox.text = request.date.map(f.string(from:))
        let duration = request.durationSec
        durationBox.text = duration == 0 ? "Off in lieu" : overtimeDurationText(seconds: request.durationSec)
        
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
        NotificationCenter.default.addObserver(
            self, selector: #selector(didReceiveNoti),
            name: .didReceiveRemoteNotification, object: nil
        )
    }
    
    @objc
    private func didReceiveNoti() {
        detailVM.fetchDetail()
    }
    
    @IBAction
    private func didTapOffInLieu() {
        responseVM.respond(.init(
            message: responseTextBox.text ?? "", status: .approve,
            offInLieu: true
        ))
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
