//
//  OvertimeHistoryView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class OvertimeHistoryView: NibView {
    
    @IBOutlet private var tableView: UITableView!
    
    var didSelectItemAt: ((IndexPath) -> Void)?
    
    var items = [OTRequest]() {
        didSet { tableView.reloadData() }
    }
    
    override func didLoadNibFile() {
        tableView.register(OvertimeHistoryItemCell.self)
        tableView.delegate = self
        tableView.dataSource = self
    }
}

extension OvertimeHistoryView: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        didSelectItemAt?(indexPath)
    }
    
}

extension OvertimeHistoryView: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
    
    func tableView(
        _ tableView: UITableView,
        cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            OvertimeHistoryItemCell.self, for: indexPath
        )
        let item = items[indexPath.row]
        cell.dayView.setDate(item.date ?? Date())
        cell.titleLabel.text = overtimeDurationText(seconds: item.durationSec) 
        cell.statusLabel.text = item.status.capitalized
        let color: UIColor?
        switch item.status {
        case "approved": color = UIColor(named: "success-600")
        case "rejected": color = UIColor(named: "danger-500")
        default: color = UIColor(named: "warning-500")
        }
        cell.statusLabel.textColor = color
        return cell
    }
    
    
}
