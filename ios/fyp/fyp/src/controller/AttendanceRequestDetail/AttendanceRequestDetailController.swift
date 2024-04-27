//
//  AttendanceRequestDetailController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import UIKit
import MapKit
import Combine

class AttendanceRequestDetailController: UIViewController {

    let user = UserModel.user
    
    @IBOutlet private var navBar: NavBarView!
    
    @IBOutlet private var dateBox: SelectBox!
    
    @IBOutlet private var typeBox: SelectBox!
    @IBOutlet private var timeBox: SelectBox!
    
    @IBOutlet private var statusBox: SelectBox!
    
    @IBOutlet private var mapBox: MKMapView!
    private let mapPin = MKPointAnnotation()
    
    @IBOutlet private var requestFromBox: SelectBox!
    @IBOutlet private var reasonBox: TextBox!
    
    @IBOutlet private var requestToBox: SelectBox!
    @IBOutlet private var responseBox: TextBox!
    
    @IBOutlet private var responseContainer: UIView!
    @IBOutlet private var responseTextBox: TextBox!
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var buttonStack: UIStackView!
    
    var bag = Set<AnyCancellable>()
    
    /// Request id
    var id: String?
    
    let detailVM = AttendanceRequestDetailVM()
    let responseVM = RespondAttendanceVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
        
        let coordinate = CLLocationCoordinate2D(
            latitude: 16.89527, longitude: 96.20049
        )
        mapBox.region = MKCoordinateRegion(
            center: coordinate,
            span: MKCoordinateSpan(
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            )
        )
        mapBox.addAnnotation(mapPin)
        
        detailVM.id = id
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
        
        detailVM.fetch()
        NotificationCenter.default.addObserver(
            self, selector: #selector(didReceiveNoti),
            name: .didReceiveRemoteNotification, object: nil
        )
    }
    
    @objc
    private func didReceiveNoti() {
        detailVM.fetch()
    }
    
    private func render(_ request: AttendanceRequest?) {
        responseContainer.isHidden = true
        
        guard let request else { return }
        let f = DateFormatter()
        f.dateFormat = "d MMM, yyyy"
        dateBox.text = request.date.map(f.string(from:))
        
        typeBox.text = request.type.capitalized
        
        f.locale = .init(identifier: "en_US_POSIX")
        f.dateFormat = "hh:mm a"
        timeBox.text = request.time.map(f.string(from:))
        
        statusBox.text = request.status.capitalized
        mapPin.coordinate = request.coordinate ?? .init()
        
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
