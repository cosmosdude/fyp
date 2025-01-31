import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthStateContext";
import employeeService from "../services/employeeService";

function useEffectUserDetail(id) {
    let [user, setUser] = useState({})
    let auth = useAuthContext()
    useEffect(() => {
        let aborter = new AbortController()
        console.log("This is called")
        async function fetchData() {
            try {
                let res = await employeeService.get(
                    id ?? 'me', auth, aborter.signal
                )
                if (res.status >= 200 && res.status < 300) {
                    setUser(await res.json())
                }
            } catch { }
        }
        fetchData()
        return () => aborter.abort()
    }, [auth, id])

    return user
}

export default useEffectUserDetail;