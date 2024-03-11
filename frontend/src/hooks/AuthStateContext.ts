import { createContext, useContext, useState } from "react";

// Auth State Context is supposed to retain a useState value.
const AuthStateContext = createContext([])
export default AuthStateContext

export const AuthContext = createContext<string|null>(null)

/**
 * Returns current auth token.
 * Use this if you're only interested in current token.
 * */
export function useAuthContext() {
    return useContext(AuthContext)
}

/**
 * Returns auth token state with getter and setter i.e [auth, setAuth].
 * */
export function useAuthStateContext() {
    return useContext(AuthStateContext)
}

/**
 * Returns a state i.e [auth, setAuth] with modified setter.
 * Getter `auth` starts with value from local storage with item named `accessToken`.
 * When setter is called, given value is also saved to local storage.
 * */
export function useAuthState() {
    let key = 'accessToken'
    
    let [auth, setAuth] = useState(
        JSON.parse(window.localStorage.getItem(key) ?? "")
    )

    return [auth, (value: string|null) => {
        // if value is invalid, remove the item
        if (!value) window.localStorage.removeItem(key)
        else window.localStorage.setItem(key, JSON.stringify(value))
        setAuth(value)
    }]
}