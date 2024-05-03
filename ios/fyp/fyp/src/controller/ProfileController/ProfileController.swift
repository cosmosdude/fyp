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
import MessageUI

class ProfileController: UIViewController {

    let userViewModel = UserVM()
    var bag = Set<AnyCancellable>()
    
    var id = "me"
    
    @IBOutlet private var backButton: UIButton!
    @IBOutlet private var logoutButton: UIButton!
    @IBOutlet private var documentSection: UIView!
    
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
        
        let isMe = id == "me"
        backButton.isHidden = isMe
        documentSection.isHidden = !isMe
        logoutButton.isHidden = !isMe
        
        userViewModel.$user.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.render(user: $0)
            }.store(in: &bag)
        userViewModel.id = id
        userViewModel.fetchUser()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        userViewModel.fetchUser()
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
        departmentTF.text = user?.departmentName
        designationTF.text = user?.designationName
        statusTF.text = user?.status
        
        eName1TF.text = user?.emergencyName1
        eRelation1TF.text = user?.emergencyRelation1
        ePhone1TF.text = user?.emergencyNumber1
        
        eName2TF.text = user?.emergencyName2
        eRelation2TF.text = user?.emergencyRelation2
        ePhone2TF.text = user?.emergencyNumber2
        
        employmentDoc.text = user?.employmentAgreementFilename
    }
    
    @IBAction
    private func didTapEmail() {
        mail(userViewModel.user?.email)
    }
    
    @IBAction
    private func didTapWorkEmail() {
        mail(userViewModel.user?.workEmail)
    }
    
    private func mail(_ email:String?) {
        guard let email else  { return }
        
        if MFMailComposeViewController.canSendMail() {
            let mail = MFMailComposeViewController()
            mail.mailComposeDelegate = self
            mail.setToRecipients([email])
            mail.setMessageBody("<p>Hello!</p>", isHTML: true)

            present(mail, animated: true)
        } else {
            // show failure alert
            presentAlert(
                title: "Unable to send mail at the moment",
                message: "Configure mail in settings",
                actions: [
                    UIAlertAction(title: "Settings", style: .default, handler: { _ in
                        UIApplication.shared.open(
                            URL(string: UIApplication.openSettingsURLString)!
                        )
                    }),
                    UIAlertAction(title: "Dismiss", style: .cancel)
                ]
            )
        }
    }

    
    @IBAction
    private func didTapPhone() {
        call(phone: userViewModel.user?.phone)
    }
    
    @IBAction
    private func didTapWorkPhone() {
        call(phone: userViewModel.user?.workPhone)
    }
    @IBAction
    private func didTapPhone1() {
        call(phone: userViewModel.user?.emergencyNumber1)
    }
    @IBAction
    private func didTapPhone2() {
        call(phone: userViewModel.user?.emergencyNumber2)
    }
    
    private func call(phone: String?) {
        UIPasteboard.general.string = phone
        presentAlert(title: "Copied")
//        guard let phone, !phone.isEmpty else { return }
//        guard let url = URL(string: "tel://\(phone)") else { return }
////        if UIApplication.shared.canOpenURL(url) {
//            UIApplication.shared.open(url)
////        }
    }
    
    @IBAction
    private func didTapContract() {
        guard let path = userViewModel.user?.employmentAgreementPath else { return }
        guard let url = URL(
            string: "http://localhost:3000/\(path)"
        ) else { return }
        UIApplication.shared.open(url)
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

extension ProfileController: MFMailComposeViewControllerDelegate {
    
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        controller.dismiss(animated: true)
    }
}
