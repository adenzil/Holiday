import { combineReducers } from 'redux'

const country = (state = '', action) => {
  switch (action.type) {
    case 'SET_COUNTRY':
      return action.value
    default:
      return state
  }
}

const year = (state = 2019, action) => {
  switch (action.type) {
    case 'SET_YEAR':
      return action.value
    default:
      return state
  }
}

export default combineReducers({
  country,
  year
})