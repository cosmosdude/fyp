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
}

export default holidayService