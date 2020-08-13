import { combineReducers } from 'redux'

import {
  REQUEST_COUNTRIES,
  RECIEVE_COUNTRIES,
  REQUEST_HOLIDAYS,
  RECIEVE_HOLIDAYS
} from '../actions'

const initialState = {
  countries: [],
  country:'',
  year:''
}

const countries = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_COUNTRIES':
      return action.value
    case 'RECIEVE_COUNTRIES':
      return action.value
    default:
      return state
  }
}

const holidays = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_HOLIDAYS':
      return action.value
    case 'RECIEVE_HOLIDAYS':
      return action.value
    default:
      return state
  }
}

export default combineReducers({
  countries,
  holidays
})