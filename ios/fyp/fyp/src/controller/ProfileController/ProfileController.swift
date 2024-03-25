//
//  ProfileController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit
import Kingfisher
import TANetworking
import Combine

class ProfileController: UIViewController {

    let userViewModel = UserVM()
    var bag = Set<AnyCancellable>()
    
    @IBOutlet private var profileImageView: UIImageView!
    
    @IBOutlet private var firstNameTF: TextField!
    @IBOutlet private var lastNameTF: TextField!
    
    @IBOutlet private var dobTF: TextField!
    @IBOutlet private var genderTF: TextField!
    
    @IBOutlet private var emailTF: TextField!
    @IBOutlet private var phoneTF: TextField!
    @IBOutlet private var addressTF: TextField!
    
    @IBOutlet private var workEmailTF: TextField!
    @IBOutlet private var workPhoneTF: TextField!
    
    @IBOutlet private var departmentTF: TextField!
    @IBOutlet private var designationTF: TextField!
    @IBOutlet private var statusTF: TextField!
    
    @IBOutlet private var eName1TF: TextField!
    @IBOutlet private var eRelation1TF: TextField!
    @IBOutlet private var ePhone1TF: TextField!
    @IBOutlet private var eName2TF: TextField!
    @IBOutlet private var eRelation2TF: TextField!
    @IBOutlet private var ePhone2TF: TextField!
    
    @IBOutlet private var employmentDoc: TextField!
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        userViewModel.$user.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.render(user: $0)
            }.store(in: &bag)
        userViewModel.fetchUser()
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    private func render(user: User?) {

        profileImageView.kf.setImage(
            with: URL(string: Api.route(user?.avatarPath ?? ""))
        )
        
        firstNameTF.text = user?.firstName
        lastNameTF.text = user?.lastName
        
        dobTF.text = user?.dob
        genderTF.text = user?.gender
        emailTF.text = user?.email
        phoneTF.text = user?.phone
        addressTF.text = user?.address
        
        workEmailTF.text = user?.workEmail
        workPhoneTF.text = user?.workPhone
        departmentTF.text = user?.firstName
        designationTF.text = user?.firstName
        statusTF.text = user?.firstName
        
        eName1TF.text = user?.emergencyName1
        eRelation1TF.text = user?.emergencyRelation1
        ePhone1TF.text = user?.emergencyNumber1
        
        eName2TF.text = user?.emergencyName2
        eRelation2TF.text = user?.emergencyRelation2
        ePhone2TF.text = user?.emergencyNumber2
        
        employmentDoc.text = user?.employmentAgreementFilename
    }
    
    @IBAction
    private func didLogout() {
        presentAlert(
            title: "Logout",
            message: "Are you sure you wish to logout?",
            preferredStyle: .actionSheet,
            actions: [
                .init(title: "Dismiss", style: .cancel),
                .init(title: "Confirm", style: .destructive, handler: { 
                    _ in
                    LoginModel.logout()
                    UserModel.clear()
                    self.view?.window?.setRootViewController(SplashController())
                })
            ]
        )
        
    }
    
}
