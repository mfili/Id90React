import axios from 'axios'

export function fetchCompanyData(){

    const options = {
        headers: {
          'ContentType': 'application/json'
        }
    }

    return {
        type: "FETCH_COMPANY_DATA",
        payload: axios.get('http://intranet.itlatingroup.cl:8090/sso/company', options)
    }
}