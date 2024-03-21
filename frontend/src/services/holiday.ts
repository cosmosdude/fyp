import { format } from 'date-fns'
import {apiRoute, apiPaths} from '../configs/api.config'

const holidayService = {
    async getHolidays(accessToken, signal, type: 'past' | 'upcoming') {
        return fetch(
            apiRoute(apiPaths.holiday.getAll(type)), {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    async get(accessToken, signal, id: string) {
        return fetch(
            apiRoute(apiPaths.holiday.get(id)), {
                method: 'GET',
                signal,
                headers: { 
                    'content-type': "application/json",
                    'authorization': `Bearer ${accessToken}`
                }
            }
        )
    },

    async create(accessToken, name: string, date: Date) {

        console.log("Accesstoken", accessToken)
        console.log("name", name)
        console.log("date", date)
        let f = new FormData()
        f.set('name', name)
        f.set('date', format(date, 'yyyy-MM-dd'))

        return fetch(
            apiRoute(apiPaths.holiday.create), {
                method: 'POST',
                headers: { 
                    'authorization': `Bearer ${accessToken}`
                },
                body: f
            }
        )
    },

    /**
     * @param accessToken access token
     * @param id hoiday id
     * @param name new holiday name
     * @param date new holiday date
    */
    async update(accessToken, id: string, name: string, date: Date) {
        console.log("Updating holidays")
        console.log("Accesstoken", accessToken)
        console.log("name", name)
        console.log("date", date)
        
        let f = new FormData()
        f.set('name', name)
        f.set('date', format(date, 'yyyy-MM-dd'))

        return fetch(
            apiRoute(apiPaths.holiday.update(id)), {
                method: 'PUT',
                headers: { 
                    'authorization': `Bearer ${accessToken}`
                },
                body: f
            }
        )
    }
}

export default holidayService