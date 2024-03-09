import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import designationService from "../services/designations"

export default function useEffectDesignations(id = "") {
    
    let accessToken = useAuthContext()
    let [departments, setDepartments] = useState([])

    id = id ?? ""

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await designationService.getAll({
                    accessToken,
                    departmentId: id ?? "",
                    signal: aborter.signal
                })

                console.log("status", res.status)

                let json = await res.json()
                console.log("response", json)
                if (res.status === 200) setDepartments(json)
            } catch {}
        }
        fetchData()
        return () => aborter.abort()
    }, [id])

    return departments
}