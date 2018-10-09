export default function reducer(state = {
  logged:true,
  logging:false,
  autentication:null,
  access_token:'',
  refresh_token:'',
  autenticationMessage: '',
  passwordAutentication: false,
  userAutentication: false,
  airlineId:0
}, action) {

  switch (action.type) {
    case 'LOG_IN_PENDING':
      state = { ...state }
      state.logging = true
      break
    case 'LOG_IN_FULFILLED':
      state = { ...state }
      state.logged = true
      state.logging = false
      state.autentication = true
      state.access_token = action.payload.data.access_token
      state.refresh_token = action.payload.data.refresh_token
      state.airlineId = action.meta.airlineId
      state.passwordAutentication = false
      state.userAutentication = false
      state.autenticationMessage = ''
      break
    case 'LOG_IN_REJECTED':
      state = { ...state }
      state.logged = false
      state.logging = false
      state.autentication = false
      state.access_token = ''
      state.refresh_token = ''
      state.passwordAutentication = true
      state.userAutentication = true
      state.autenticationMessage = 'Usuario y/o contraseña incorrectos'
      break
    case 'LOG_OUT':
      state = { ...state }
      state.logged = false
      state.access_token = ''
      state.refresh_token = ''
      state.passwordAutentication = false
      state.userAutentication = false
      state.autenticationMessage = ''
      break 
    case 'CLEAR_LOGIN':
      state.passwordAutentication = false
      state.userAutentication = false
      state.autenticationMessage = ''
      state.airlineId = 0
      break
  }

  return state
}
