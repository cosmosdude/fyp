import {apiRoute, apiPaths} from '../configs/api.config'

export default async function signin(username, password) {
    console.log('username', username, 'password', password)
    return fetch(
        apiRoute(apiPaths.signIn), {
            method: 'POST',
            headers: { 
                'content-type': "application/json",
            },
            body: JSON.stringify({username, password})
        }
    )
}