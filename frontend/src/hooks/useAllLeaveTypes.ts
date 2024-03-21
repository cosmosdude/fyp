import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

export default function useAllLeaveTypes() {
    let auth = useAuthContext()
    let [leaves, setLeaves] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                apiRoute
                let res = await fetch(apiRoute(apiPaths.leaves.getAll()), {
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