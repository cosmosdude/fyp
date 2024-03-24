//
//  TeamListView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class TeamListView: NibView {
    
    @IBOutlet private var tableView: UITableView!
    
    override func didLoadNibFile() {
        tableView.register(TeamCell.self)
        tableView.separatorStyle = .none
        tableView.delegate = self
        tableView.dataSource = self
    }
    
}

extension TeamListView: UITableViewDelegate {
    
}

extension TeamListView: UITableViewDataSource {
    func tableView(
        _ tableView: UITableView, 
        numberOfRowsInSection section: Int
    ) -> Int {
        return 10
    }
    
    func tableView(
        _ tableView: UITableView, cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(TeamCell.self, for: indexPath)
        return cell
    }
}
