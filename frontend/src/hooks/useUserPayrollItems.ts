import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch payroll items of given user with id
*/
export default function useUserPayrollItems(id) {
    let auth = useAuthContext()
    let [items, setItems] = useState([])
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.payroll.userPayrollItems(id)), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    let items = await res.json()
                    console.log("Items", items)
                    setItems(items)
                }
            } catch { }
        }
        if(id) fetchData()
        return () => aborter.abort()
    }, [id])

    return [items, setItems]
}