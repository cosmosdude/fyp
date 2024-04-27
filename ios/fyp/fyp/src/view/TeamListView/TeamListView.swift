//
//  TeamListView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class TeamListView: NibView {
    
    @IBOutlet private var tableView: UITableView!
    
    var team = [TeamMember]() { didSet { tableView.reloadData() } }
    
    override func didLoadNibFile() {
        tableView.register(EmptyViewCell.self)
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
    ) -> Int { max(1, team.count) }
    
    func tableView(
        _ tableView: UITableView, cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        if team.isEmpty {
            let cell = tableView.dequeueReusableCell(
                EmptyViewCell.self, for: indexPath
            )
            let ev = cell.emptyView
            ev?.image = UIImage(named: "illu.no-team")
            ev?.title = "No Team"
            ev?.message = "You have no team for now"
            return cell
        }
        let cell = tableView.dequeueReusableCell(TeamCell.self, for: indexPath)
        let member = team[indexPath.row]
        cell.render(member)
        return cell
    }
}
