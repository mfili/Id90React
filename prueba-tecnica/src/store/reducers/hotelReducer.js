export default function reducer(state = {
  hotels: [],
  guests: 1,
  checkin: Date(),
  checkout: Date(),
  destination: '',
  keyword:null,
  rooms: 1,
  longitude:null,
  latitude:null,
  sort_criteria:'',
  sort_order:'',
  per_page:25,
  page:1,
  currency:'',
  price_low:null,
  price_high:null
}, action) {

  switch (action.type) { 
    case 'GET_HOTELS_PENDING':
      state = Object.assign({}, state)
      break
    case 'GET_HOTELS_FULFILLED':
      state = Object.assign({}, state)
      state.hotels = action.payload.data
      break
    case 'GET_HOTELS_REJECTED':
      state = Object.assign({}, state)
      break
    case 'CHANGE_VALUE':
      state = { ...state }
      state[action.arg.id] = action.arg.value
      break
  }

  return state
}
