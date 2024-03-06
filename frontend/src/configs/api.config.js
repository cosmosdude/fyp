// Server host
export const host = 'http://127.0.0.1:3000'

export function apiRoute(url) {
    url = url.replace(/^\/+/, '')
    return `${host}/${url}`
}

export const apiPaths = {
    signIn: '/api/auth/login'
}