 import axios from 'axios' 
 import {restApiURL} from '../config'
export function getHotels(guests,checkin,checkout,destination,rooms,currency){ 
    const options = {
        url: 'https://beta.id90travel.com/api/v1/hotels.json?guests%5B%5D='+guests+'&checkin='+checkin+'&checkout='+checkout+'&destination='+destination+'&keyword=&rooms='+rooms+'&longitude=&latitude=&sort_criteria=Overall&sort_order=desc&per_page=25&page=1&currency='+currency+'&price_low=1&price_high=',
        method: 'GET',
        headers: {
          'ContentType': 'application/json'
        }
    }
    
    return {
        type: "GET_HOTELS",
        payload: axios(options)
    }
}

export function changeValue(id, value) {
    return {
        type: 'CHANGE_VALUE',
        arg: {id, value}
    }
}