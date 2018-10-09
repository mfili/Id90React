 import axios from 'axios' 
 import {restApiURL} from '../config'
export function searchHotels(data){ 
    const options = {
        url: restApiURL + '/api/v1/hotels.json',
        data:data,
        method: 'GET',
        headers: {
          'ContentType': 'application/json'
        }
    }
    
    return {
        type: "FETCH_AIRLINES",
        payload: axios(options)
    }
}

export function setAirlines(airlineId,airlineLabel) {
    return {
        type: 'SET_AIRLINES',
        arg: {airlineId, airlineLabel}
    }
}