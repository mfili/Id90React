 import axios from 'axios' 
 import {restApiURL} from '../config'
export function fetchAirlinesList(){ 
    const options = {
        url: restApiURL + '/airlines',
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