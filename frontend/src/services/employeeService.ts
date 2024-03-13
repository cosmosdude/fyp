import { format } from 'date-fns'
import {apiRoute, apiPaths} from '../configs/api.config'

interface CreateEmployeeProps {
    avatar: Blob | null | undefined,
    username: string,
    password: string,

    first_name: string,
    last_name: string,
    dob: string|null,
    gender: string|null,
    phone: string|null,
    email: string|null,
    work_email: string,
    work_phone: string,
    // role_id: 4, // temporarily 4
    department_id: string|null,
    designation_id: string|null,

    emergency_name1: string|null,
    emergency_name2: string|null,
    emergency_number1: string|null,
    emergency_number2: string|null,
    emergency_relation1: string|null,
    emergency_relation2: string|null,

    employment_contract: Blob| null | undefined,
}

const employeeService = {
    
    /**
     * Get all employees. 
     */
    async getAll(
        accessToken: string|null|undefined,
        signal: AbortSignal|null|undefined
    ) {
        return fetch(
            apiRoute(
                apiPaths.employee.getAll
            ), 
            {
                method: 'GET',
                signal,
                headers: { 
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    // /**
    //  * Get designation detail. 
    //  */
    // async get({accessToken, id, signal}) {
    //     return fetch(
    //         apiRoute(apiPaths.designation.get(id)), {
    //             method: 'GET',
    //             signal,
    //             headers: { 
    //                 'content-type': "application/json",
    //                 'authorization': `Bearer ${accessToken}`
    //             }
    //         }
    //     )
    // },

    /**
     * Create new employee.
     */
    async create(
        employee: CreateEmployeeProps, 
        accessToken: string|null|undefined,
        signal: AbortSignal|null|undefined
    ) {
        let f = new FormData()
        for (const [k,v] of Object.entries(employee).filter(([_, v]) => !!v)) {
            console.log(k, v)
            f.set(k, v)
        }
        
        return fetch(
            apiRoute(apiPaths.employee.create), {
                method: 'POST',
                signal,
                headers: { 
                    // 'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                },
                body: f
            }
        )
    }

    /**
     * Update designation.
     */
    // async update({
    //     id, designationName, departmentId, accessToken, signal
    // }) {
    //     console.log(id, designationName, departmentId, accessToken, signal)
    //     return fetch(
    //         apiRoute(apiPaths.designation.update(id)), {
    //             method: 'PUT',
    //             signal,
    //             headers: { 
    //                 'content-type': "application/json",
    //                 'authorization': `Bearer ${accessToken}`
    //             },
    //             body: JSON.stringify({
    //                 name: designationName,
    //                 departmentId
    //             })
    //         }
    //     )
    // }

}

export default employeeService