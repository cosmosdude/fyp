import {apiRoute, apiPaths} from '../configs/api.config'

const designationService = {

    /**
     * Get all designations. 
     */
    async getAll({accessToken, departmentId = "", signal}) {
        return fetch(
            apiRoute(
                apiPaths.designation.getAll + '?' + new URLSearchParams({departmentId})
            ), 
            {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    /**
     * Get designation detail. 
     */
    async get({accessToken, id, signal}) {
        return fetch(
            apiRoute(apiPaths.designation.get(id)), {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    /**
     * Create designation.
     */
    async create({
        designationName, departmentId, accessToken, signal
    }) {
        return fetch(
            apiRoute(apiPaths.designation.create), {
                method: 'POST',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    name: designationName,
                    departmentId
                })
            }
        )
    },

    /**
     * Update designation.
     */
    async update({
        id, designationName, departmentId, accessToken, signal
    }) {
        console.log(id, designationName, departmentId, accessToken, signal)
        return fetch(
            apiRoute(apiPaths.designation.update(id)), {
                method: 'PUT',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    name: designationName,
                    departmentId
                })
            }
        )
    }
}

export default designationService