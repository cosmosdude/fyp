import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch shifts of given user with
*/
export default function useUserShifts(id) {
    let auth = useAuthContext()
    let [shifts, setShifts] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.shift.get(id)), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setShifts(await res.json())
                }
            } catch { }
        }
        if(id) fetchData()
        return () => aborter.abort()
    }, [id])

    return shifts
}