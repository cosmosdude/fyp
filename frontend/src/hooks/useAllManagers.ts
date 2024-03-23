import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch all leave requests from the server.
*/
export default function useAllManagers() {
    let auth = useAuthContext()
    let [managers, setManagers] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                apiRoute
                let res = await fetch(apiRoute(apiPaths.employee.getAllManagers), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    let json =  await res.json()
                    console.log("Managers", json)
                    setManagers(json)
                }
            } catch { }
        }

        fetchData()
        return () => aborter.abort()
    }, [])

    return managers
}