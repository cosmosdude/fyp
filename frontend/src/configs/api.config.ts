// Server host
export const host = 'http://127.0.0.1:3000'

/**
 * Get api route relative to specified api host.
*/
export function apiRoute(url: string) {
    url = url.replace(/^\/+/, '')
    return `${host}/${url}`
}

/**
 * Get image route
*/
export function imageRoute(url: string|null|undefined) {
    if (!url) return null
    return apiRoute(url)
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
    getDepartment(id: string) { return `/api/departments/department/${id}` },
    /**
     * API Path for updating department.
     * Same api path with get department
     * 
     * @param id Department id
     * */
    updateDepartment(id: string) { return this.getDepartment(id) },
    /**
     * API path for deleting department.
     * Same api path with get department.
     * 
     * @param id Department id
     * */
    deleteDepartment(id: string) { return this.getDepartment(id) },

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
        get(id: string) { return `/api/departments/department/${id}` },
        /**
         * API Path for updating department.
         * Same api path with get department
         * 
         * @param id Department id
         * */
        update(id: string) { return this.get(id) },
        /**
         * API path for deleting department.
         * Same api path with get department.
         * 
         * @param id Department id
         * */
        delete(id: string) { return this.get(id) },
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
    getDesignation(id: string) { return `/api/designations/designation/${id}` },
    /**
     * API Path for updating designation.
     * Same api path with get designation
     * 
     * @param id Designation id
     * */
    updateDesignation(id: string) { return this.getDesignation(id) },
    /**
     * API path for deleting designation.
     * Same api path with get designation.
     * 
     * @param id Designation id
     * */
    deleteDesignation(id: string) { return this.getDesignation(id) },

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
        get(id: string) { return `/api/designations/designation/${id}` },
        /**
         * API Path for updating designation.
         * Same api path with get designation
         * 
         * @param id Designation id
         * */
        update(id: string) { return this.get(id) },
        /**
         * API path for deleting designation.
         * Same api path with get designation.
         * 
         * @param id Designation id
         * */
        delete(id: string) { return this.get(id) },
    },

    employee: {
        /**
        * API for getting all employees
        */
        getAll: "api/users",
        getAllManagers: "api/users/managers",
        get(id: string|null|undefined = "") { 
            return `api/users/user/${id}`
        },
        /**
         * API for creating employee
         */
        create: "api/users/user",

        /**
         * API for updating user.
         * @param id ID of the user.
         * @returns api path for updating user.
         */
        update(id: string|null|undefined = "") { return this.get(id) },
    },

    holiday: {
        getAll(type: 'past' | 'upcoming') { return `api/holidays?type=${type}` },
        get(id: string|null|undefined = "") {
            return `api/holidays/holiday/${id}`
        },
        create: "api/holidays/holiday",
        update(id: string|null|undefined = "") { return this.get(id) },
        delete(id: string|null|undefined = "") { return this.get(id) },
    },

    /**
     * Leave related api paths.
    */
    leave: {
        /**
         * System related api paths.
         * Such as leave types.
        */
        system: {
            /**
             * relative URL for getting all leaves
            */
            getAll() { return `api/leaves` },
            /**
             * relative URL for getting leave detail
            */
            get(id: string) { return `api/leaves/leave/${id}`},
            /**
             * Relative URL for creating leave
            */
            create() { return `api/leaves/leave` },
            /**
             * relative URL for updating leave
            */
            update(id: string) { return this.get(id)},
            /**
             * relative URL for deleting leave
            */
            delete(id: string) { return this.get(id)}
        },
        
        /**
         * User related api paths
        */
        user: {
            /**
             * URL for getting all leave requests.
            */
            getAllLeaveRequests() { return `api/leaves/requests`},
        
            /**
             * URL for responding to a leave request.
            */
            respondToLeaveRequest(id) { return `api/leaves/requests/request/${id}/response`},
        }
    },

    overtime: {

        /**
         * URL for getting all overtime requests.
        */
        getAllOvertimeRequests() {
            return `api/overtimes/requests`
        },

        /**
         * URL for responding to a overtime request.
        */
        respondToOvertimeRequest(id: string) {
            return `api/overtimes/requests/request/${id}`
        }

    },

    shift: {
        /**
         * URL for getting all user shifts.
        */
        getAll() {
            return `api/shifts/`
        },

        /**
         * URL for getting user's shifts.
        */
        get(id: string) {
            return `api/shifts/${id}`
        },

        /**
         * URL for updating shift
        */
        update() {
            return `api/shifts/shift`
        }
    },

    attendance: {
        /**
         * URL for getting all user attendance.
        */
        getAllRecords(from: string = "", to: string = "") {
            return `api/attendances?from=${from}&to=${to}`
        },

        /**
         * Get all attendance requests.
        */
        getAllRequests() {
            return `api/attendances/requests`
        },

        respondRequest(id: string) {
            return `api/attendances/requests/request/${id}`
        }

        
    }
}