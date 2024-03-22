//
//  ManagerSelectionController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class ManagerSelectionController: UIViewController {

    var managers: [ItemGroup<String, [Manager]>] = []
    var selected: IndexPath?

    var didSelectManagerAt: (IndexPath) -> Void = {_ in}
    
    override var modalPresentationStyle: UIModalPresentationStyle {
        set { } get { .overFullScreen }
    }
    
    @IBOutlet private var tableView: UITableView!

    init(managers: [ItemGroup<String, [Manager]>], selected: IndexPath? = nil) {
        self.managers = managers
        self.selected = selected
        super.init(nibName: nil, bundle: nil)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(ManagerSelectionCell.self)
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    @IBAction
    private func dismiss() {
        self.dismiss(animated: true)
    }

}

extension ManagerSelectionController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: false)
        
        dismiss(animated: true) { [didSelectManagerAt] in
            didSelectManagerAt(indexPath)
        }
        
    }
}

extension ManagerSelectionController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        managers.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        managers[section].count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            ManagerSelectionCell.self, for: indexPath
        )
        let manager = managers[indexPath.section][indexPath.row]
        cell.renderSelected(indexPath == selected)
        cell.render(manager: manager)
        
        return cell
    }
}
