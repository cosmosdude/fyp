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

    async getDepartment({accessToken, id, signal}) {
        return fetch(
            apiRoute(apiPaths.getDepartment(id)), {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    async create({
        departmentName, accessToken, signal
    }) {
        return fetch(
            apiRoute(apiPaths.createDepartment), {
                method: 'POST',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({name: departmentName})
            }
        )
    },

    async update({
        id, departmentName, accessToken, signal
    }) {
        return fetch(
            apiRoute(apiPaths.updateDepartment(id)), {
                method: 'PUT',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({name: departmentName})
            }
        )
    }
}

export default departmentService