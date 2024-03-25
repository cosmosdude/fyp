//
//  CurrentLocationView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import UIKit
import MapKit

class CurrentLocationView: NibView {
    
    private let manager = CLLocationManager()
    /// User's coordinate
    private(set) var coordinate: CLLocationCoordinate2D!
    
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var mapView: MKMapView!
    
    @IBOutlet private var noPermissionView: UIView!
    
    @IBInspectable
    var title: String? {
        get { titleLabel.text }
        set {
            titleLabel.text = newValue
            titleLabel.isHidden = newValue?.isEmpty ?? true
        }
    }
    
    private let userPin = MKPointAnnotation()
    
    deinit {
        print("Deinit - Current Location View")
        manager.stopUpdatingLocation()
    }
    
    override func didLoadNibFile() {
        mapView.addAnnotation(userPin)
        manager.delegate = self
        manager.requestWhenInUseAuthorization()
    }
    
}

extension CurrentLocationView: CLLocationManagerDelegate {
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        
        let isGranted = status == .authorizedWhenInUse || status == .authorizedAlways
        if (isGranted) {
            manager.startUpdatingLocation()
        }
        
        DispatchQueue.main.async {
            self.noPermissionView.isHidden = isGranted
        }
    }
    
    func locationManager(
        _ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]
    ) {
        guard let coordinate = locations.first?.coordinate else { return }
        print("Location - ", coordinate)
        DispatchQueue.main.async {
            self.coordinate = coordinate
            self.userPin.coordinate = coordinate
            self.mapView.setRegion(
                MKCoordinateRegion(
                    center: coordinate,
                    span: .init(latitudeDelta: 0.01, longitudeDelta: 0.01)
                ),
                animated: true
            )
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Error", error.localizedDescription)
    }
    
}
