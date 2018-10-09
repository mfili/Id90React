export default function reducer(state = {
  airline: []
}, action) {

  switch (action.type) {
    case 'FETCH_AIRLINES_PENDING':
      state = Object.assign({}, state)
      break
    case 'FETCH_AIRLINES_FULFILLED':
      state = Object.assign({}, state)
      state.airline = action.payload.data
      break
    case 'FETCH_AIRLINES_REJECTED':
      state = Object.assign({}, state)
      break
    case 'SET_AIRLINES':
      state = Object.assign({}, state)
      state.companyId = action.arg.companyId?action.arg.companyId:' '
      state.companyLabel = action.arg.companyLabel?action.arg.companyLabel:' '
      break
  }

  return state
}
