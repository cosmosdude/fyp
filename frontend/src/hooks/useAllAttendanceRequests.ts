import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch all overtime requests from the server.
*/
export default function useAllAttendanceRequests() {
    let auth = useAuthContext()
    let [requests, setRequests] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                apiRoute
                let res = await fetch(apiRoute(apiPaths.attendance.getAllRequests()), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setRequests(await res.json())
                }
            } catch { }
        }

        fetchData()
        return () => aborter.abort()
    }, [])

    return [requests, setRequests]
}