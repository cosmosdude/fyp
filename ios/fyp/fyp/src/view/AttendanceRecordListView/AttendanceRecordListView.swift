//
//  AttendanceRecordListView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import UIKit

class AttendanceRecordListView: NibView {
    
    @IBOutlet private var tableView: UITableView!
    
    var records = [Attendance]() { didSet { tableView.reloadData() } }
    
    override func didLoadNibFile() {
        tableView.register(AttendanceRecordCell.self)
        tableView.delegate = self
        tableView.dataSource = self
    }
}

extension AttendanceRecordListView: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
//        didSelectItemAt?(indexPath)
    }
    
}

extension AttendanceRecordListView: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        records.count
    }
    
    func tableView(
        _ tableView: UITableView,
        cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            AttendanceRecordCell.self, for: indexPath
        )
        let record = records[indexPath.row]
        cell.render(record)
        return cell
    }
    
    
}
