import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch all overtime requests from the server.
*/
export default function useAllAttendanceRecords() {
    let auth = useAuthContext()
    let [records, setRecords] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.attendance.getAllRecords()), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setRecords(await res.json())
                }
            } catch { }
        }

        fetchData()
        return () => aborter.abort()
    }, [])

    return records
}