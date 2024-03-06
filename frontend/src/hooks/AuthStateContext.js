import { createContext, useContext, useState } from "react";

// Auth State Context is supposed to retain a useState value.
const AuthStateContext = createContext([])
export default AuthStateContext

export const AuthContext = createContext(null)

export function useAuthContext() {
    return useContext(AuthContext)
}

export function useAuthStateContext() {
    return useContext(AuthStateContext)
}

export function useAuthState() {
    let key = 'accessToken'
    let [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem(key)))

    return [auth, (value) => {
        window.localStorage.setItem(key, JSON.stringify(value))
        setAuth(value)
    }]
}