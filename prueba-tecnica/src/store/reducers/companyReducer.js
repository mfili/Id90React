export default function reducer(state = {
  data: []
}, action) {

  switch (action.type) {
    case 'FETCH_COMPANY_DATA_PENDING':
      state = { ...state }
      break
    case 'FETCH_COMPANY_DATA_FULFILLED':
      state = { ...state }
      state.data = action.payload.data.slice()
      break
    case 'FETCH_COMPANY_DATA_REJECTED':
      state = { ...state }
      break
  }

  return state
}
