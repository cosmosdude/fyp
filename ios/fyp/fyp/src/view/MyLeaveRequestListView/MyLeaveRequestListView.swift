//
//  MyLeaveRequestListView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class MyLeaveRequestListView: NibView {
    
    @IBOutlet private var tableView: UITableView!
    
    var didSelectItemAt: ((IndexPath) -> Void)?
    
    let dayF = DateFormatter()
    let monthF = DateFormatter()
    
    
    var requests = [LeaveRequest]() {
        didSet { tableView.reloadData() }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    private func setup() {
        dayF.dateFormat = "d"
        monthF.dateFormat = "MMM"
        
        tableView.register(MyLeaveRequestListCell.self)
        tableView.delegate = self
        tableView.dataSource = self
    }
    
}

extension MyLeaveRequestListView: UITableViewDelegate {

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        didSelectItemAt?(indexPath)
    }
    
}

extension MyLeaveRequestListView: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        requests.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        print("Called")
        let cell = tableView.dequeueReusableCell(MyLeaveRequestListCell.self, for: indexPath)
        let request = requests[indexPath.row]
        
        cell.titleLabel.text = request.leaveName
        
        cell.subtitleLabel.text = request.status.capitalized
        let color: UIColor?
        switch request.status {
        case "approved": color = UIColor(named: "success-600")
        case "rejected": color = UIColor(named: "danger-500")
        default: color = UIColor(named: "warning-500")
        }
        cell.subtitleLabel.textColor = color
        cell.startView.setDate(request.from)
        cell.endView.setDate(request.to)
        
        cell.startView.isHidden = (request.fromDate == request.toDate)
        cell.arrow.isHidden = (request.fromDate == request.toDate)
        
        return cell
    }
}
