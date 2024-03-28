import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch shifts of given user with
*/
export default function useMonthlyOvertimeStatistics() {
    let auth = useAuthContext()
    let [statistic, setStatistic] = useState({})
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.overtime.getMonthlyStatistic()), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    let json = await res.json()
                    setStatistic(json)
                } else {
                    console.error("ERROR", await res.text())
                }
            } catch (error) { 
                console.error("ERROR", error)
            }
        }
        fetchData()
        return () => aborter.abort()
    }, [])

    return statistic
}