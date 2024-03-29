//
//  PayslipDetailVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

final class PayslipDetailVM: StatusVM<Void, String> {
    
    var id: String = ""
    let service = PayslipService(accessToken: LoginModel.accessToken ?? "")
    
    @Published
    private(set) var payslip: Payslip?
    
    private(set) var allowances = [PayslipItem]()
    private(set) var deductions = [PayslipItem]()
    
    var salary: String = "0 MMK"
    var overtime: String = "0 MMK"
    var grossIncome: String = "0 MMK"
    var tax: String = "0 MMK"
    var ssb: String = "0 MMK"
    var relief: String?
    var grossDeduction: String = "0 MMK"
    var netSalary: String = "0 MMK"
    
    private func render(_ payslip: Payslip) {
        
        let grossIncome = payslip.items.filter { $0.kind == .allowance }
            .reduce(payslip.detail.salary + payslip.detail.overtime) { partialResult, item in
                partialResult + item.amount * (item.isRelative ? payslip.detail.salary : 1)
            }
        self.grossIncome = String(format: "%.f MMK", grossIncome)
        salary = String(format: "%.f MMK", payslip.detail.salary)
        overtime = String(format: "%.f MMK", payslip.detail.overtime)
        
        tax = String(
            format: "(%.f %@) %.f MMK",
            payslip.detail.tax * 100, "%",
            payslip.detail.tax * payslip.detail.salary
        )
        ssb = String(format: "%.f MMK", payslip.detail.ssb)
        
        var grossDeduction = payslip.items.filter { $0.kind == .deduction }
            .reduce(payslip.detail.ssb + payslip.detail.tax * payslip.detail.salary) { partialResult, item in
                partialResult + item.amount * (item.isRelative ? payslip.detail.salary : 1)
            }
        
        if (grossDeduction > (grossIncome / 2)) {
            let diff = grossDeduction - (grossIncome / 2)
            grossDeduction = grossIncome / 2
            
            relief = String(format: "%.f MMK", diff)
        } else {
            relief = nil
        }
        
        self.grossDeduction = String(format: "%.f MMK", grossDeduction)
            
        netSalary = String(format: "%.f MMK", grossIncome - grossDeduction)
    }
}

extension PayslipDetailVM {
    
    func fetchDetail() {
        Task(operation: _fetchDetail)
    }
    
    @Sendable
    private func _fetchDetail() async {
        status = .processing
        do {
            let payslip = Payslip(try await service.getPayslipDetail(id: id))
            render(payslip)
            self.payslip = payslip
            allowances = payslip.items.filter { $0.kind == .allowance}
            deductions = payslip.items.filter { $0.kind == .deduction}
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
    }
    
}
