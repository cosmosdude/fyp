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
    deleteDepartment(id) { return this.getDepartment(id) },

    /**
     * Department API Resources
     * */
    department: {
        /**
         * API Path for getting all departments
         * */
        getAll: '/api/departments',
        /**
         * API Path for creating department
         * */
        create: '/api/departments/department',
        /**
         * API Path for getting department
         * 
         * @param id Department id
         * */
        get(id) { return `/api/departments/department/${id}` },
        /**
         * API Path for updating department.
         * Same api path with get department
         * 
         * @param id Department id
         * */
        update(id) { return this.getDepartment(id) },
        /**
         * API path for deleting department.
         * Same api path with get department.
         * 
         * @param id Department id
         * */
        delete(id) { return this.getDepartment(id) },
    },


    // Designations
    /**
     * API Path for getting all designations
     * */
    getAllDesignations: '/api/designations',
    /**
     * API Path for creating designation
     * */
    createDesignation: '/api/designations/designation',
    /**
     * API Path for getting designation
     * 
     * @param id Designation id
     * */
    getDesignation(id) { return `/api/designations/designation/${id}` },
    /**
     * API Path for updating designation.
     * Same api path with get designation
     * 
     * @param id Designation id
     * */
    updateDesignation(id) { return this.getDesignation(id) },
    /**
     * API path for deleting designation.
     * Same api path with get designation.
     * 
     * @param id Designation id
     * */
    deleteDesignation(id) { return this.getDesignation(id) },

    /**
     * Designation API Resource
     * */
    designation: {
        /**
         * API Path for getting all designations
         * */
        getAll: '/api/designations',
        /**
         * API Path for creating designation
         * */
        create: '/api/designations/designation',
        /**
         * API Path for getting designation
         * 
         * @param id Designation id
         * */
        get(id) { return `/api/designations/designation/${id}` },
        /**
         * API Path for updating designation.
         * Same api path with get designation
         * 
         * @param id Designation id
         * */
        update(id) { return this.getDesignation(id) },
        /**
         * API path for deleting designation.
         * Same api path with get designation.
         * 
         * @param id Designation id
         * */
        delete(id) { return this.getDesignation(id) },
    },

    employee: {
        create: "api/users/user"
    },
}