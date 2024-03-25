//
//  RequestAttendanceVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking
import CoreLocation

final class RequestAttendanceVM: StatusVM<Void, String> {
    
    let service = AttendanceService(accessToken: LoginModel.accessToken)
    
    struct Request {
        let date: Date
        let time: Date
        let type: String
        let coordinate: CLLocationCoordinate2D?
        let recipientId: String
        let reason: String?
    }
    
    func request(_ req: Request) {
        Task { await _request(req) }
    }
    
    @Sendable
    private func _request(_ req: Request) async {
        status = .processing
        do {
            try await service.requestAttendance(
                date: req.date,
                time: req.time,
                type: req.type,
                lat: req.coordinate?.latitude,
                lng: req.coordinate?.longitude,
                recipientId: req.recipientId,
                reason: req.reason
            )
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
    }
    
}
