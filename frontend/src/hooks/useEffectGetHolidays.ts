import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import holidayService from "../services/holiday"

function useEffectGetHolidays(type: 'past' | 'upcoming'): any {
    let [holidays, setHolidays] = useState([])
    let auth = useAuthContext()
    useEffect(() => {
        let aborter = new AbortController()
        console.log("This is called")
        async function fetchData() {
            try {
                let res = await holidayService.getHolidays(
                    auth, aborter.signal, type
                )
                if (res.status >= 200 && res.status < 300) {
                    setHolidays(await res.json())
                }
            } catch { }
        }
        fetchData()
        return () => aborter.abort()
    }, [auth])

    return holidays
}

export default useEffectGetHolidays;