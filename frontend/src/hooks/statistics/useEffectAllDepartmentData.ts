import { useEffect, useState } from "react"
import { useAuthContext } from "../AuthStateContext"
import { apiRoute } from "../../configs/api.config"

export default function useEffectAllDepartmentData(): any[] {

    let accessToken = useAuthContext()
    let [datas, setData] = useState<any[]>([])

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute('/api/statistic/departments'), {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    let json = await res.json()
                    console.log("Department Data are", json)
                    setData(json)
                } else console.log("Issue is", await res.text())
            } catch {}
        }
        fetchData()
        return () => aborter.abort()
    }, [])

    return datas
}