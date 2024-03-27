import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch all overtime requests from the server.
*/
export default function useAllUsersOnLeave() {
    let auth = useAuthContext()
    let [leaves, setLeaves] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.leave.system.getAllUsersOnLeave()), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setLeaves(await res.json())
                }
            } catch { }
        }

        fetchData()
        return () => aborter.abort()
    }, [])

    return leaves
}