 import axios from 'axios' 
 import {restApiURL} from '../config'
export function login(username,password,airlineId){
    const options = {
        url: restApiURL + '/session.json?session[airline]=HAWAIIAN AIRLINES (HA)&session[username]='+username+'&session[password]='+password+'&session[remember_me]=1',
        method: 'POST',
        headers: {
          'ContentType': 'application/json'
        }
    }
    return {
        type: "LOG_IN",
        meta: {airlineId: airlineId},
        payload: axios(options)
    }
}

export function logout(){    
    return {
        type: "LOG_OUT"
    }
}

export function clearLogin(){    
    return {
        type: "CLEAR_LOGIN"
    }
}