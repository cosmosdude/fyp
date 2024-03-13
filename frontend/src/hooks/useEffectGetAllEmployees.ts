import { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import { useAuthContext } from "./AuthStateContext";

function useEffectGetAllEmployees() {
    let [employees, setEmployees] = useState([])
    
    let auth = useAuthContext()

    useEffect(() => {
        let aborter = new AbortController()
        async function getData() {
            try {
                let res = await employeeService.getAll(
                    auth, aborter.signal
                )
    
                if (res.status >= 200 && res.status < 300){
                    let emps = await res.json()
                    setEmployees(emps);
                    console.log(emps)
                }
                
            } catch {

            }
            
        }

        getData()
        
        return () => aborter.abort()
    }, [])

    return employees;
}

export default useEffectGetAllEmployees;