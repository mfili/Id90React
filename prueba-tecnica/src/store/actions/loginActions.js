import axios from 'axios'
export function login(username, password, companyId){    
    
    const options = {
        url: 'http://intranet.itlatingroup.cl:8090/sso/oauth/token?grant_type=password&username='+username+'&password='+password,
        method: 'POST',
        headers: {
          'ContentType': 'application/json'
        },
        auth: {
            username: 'encuesta_satisfaccion',
            password: 'Aa123456'
        }
    }
    
    return {
        type: "LOG_IN",
        meta: {companyId: companyId},
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

export function login2(){    
    return {
        type: "LOG_IN2"
    }
}