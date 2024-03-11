import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import departmentService from "../services/department"

export default function useEffectAllDepartments() {

    let accessToken = useAuthContext()
    let [departments, setDepartments] = useState([])

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await departmentService.getAllDepartments({
                    accessToken,
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
    }, [])

    return departments
}