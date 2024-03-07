import {apiRoute, apiPaths} from '../configs/api.config'

const departmentService = {

    /**
     * Get all departments 
     */
    async getAllDepartments({accessToken, signal}) {
        return fetch(
            apiRoute(apiPaths.getAllDepartments), {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    async createDepartment({
        departmentName, accessToken, signal
    }) {
        return fetch(
            apiRoute(apiPaths.signIn), {
                method: 'POST',
                signal,
                headers: { 
                    'content-type': "application/json",
                },
                body: JSON.stringify({username, password})
            }
        )
    }
}

export default departmentService