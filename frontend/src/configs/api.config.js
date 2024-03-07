// Server host
export const host = 'http://127.0.0.1:3000'

export function apiRoute(url) {
    url = url.replace(/^\/+/, '')
    return `${host}/${url}`
}

export const apiPaths = {

    /**
     * API Path for authenticating user.
     * */
    signIn: '/api/auth/login',

    // Departments
    /**
     * API Path for getting all departments
     * */
    getAllDepartments: '/api/departments',
    /**
     * API Path for creating department
     * */
    createDepartment: '/api/departments/department',
    /**
     * API Path for getting department
     * 
     * @param id Department id
     * */
    getDepartment(id) { return `/api/departments/department/${id}` },
    /**
     * API Path for updating department.
     * Same api path with get department
     * 
     * @param id Department id
     * */
    updateDepartment(id) { return this.getDepartment(id) },
    /**
     * API path for deleting department.
     * Same api path with get department.
     * 
     * @param id Department id
     * */
    deleteDepartment(id) { return this.getDepartment(id) }


}