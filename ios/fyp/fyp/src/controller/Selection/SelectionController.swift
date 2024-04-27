//
//  SelectionController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class SelectionController: UIViewController, UIViewControllerTransitioningDelegate {

    var items: [ItemGroup<String, [String]>] = []
    var selected: IndexPath?

    var didSelectItemAt: (IndexPath) -> Void = {_ in}
    
    override var modalPresentationStyle: UIModalPresentationStyle {
        set { } get { .custom }
    }
    
    override var transitioningDelegate: UIViewControllerTransitioningDelegate? {
        set { } get { self }
    }
    
    func presentationController(forPresented presented: UIViewController, presenting: UIViewController?, source: UIViewController) -> UIPresentationController? {
        DimmingBackgroundPresentationController(
            presentedViewController: presented,
            presenting: presenting
        )
    }
    
    @IBOutlet private var tableView: UITableView!

    convenience init(items: [String], selected: IndexPath? = nil) {
        self.init(items: [ItemGroup(info: "", items: items)], selected: selected)
    }
        
    
    init(items: [ItemGroup<String, [String]>], selected: IndexPath? = nil) {
        self.items = items
        self.selected = selected
        super.init(nibName: nil, bundle: nil)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(SelectionCell.self)
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    @IBAction
    private func dismiss() {
        self.dismiss(animated: true)
    }

}


extension SelectionController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: false)
        
        dismiss(animated: true) { [didSelectItemAt] in
            didSelectItemAt(indexPath)
        }
        
    }
}

extension SelectionController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        items.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        items[section].count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            SelectionCell.self, for: indexPath
        )
        let item = items[indexPath.section][indexPath.row]
        cell.renderSelected(indexPath == selected)
        cell.render(label: item)
        
        return cell
    }
}
