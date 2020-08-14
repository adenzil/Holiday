import { combineReducers } from 'redux'

import {
  SET_COUNTRY,
  SET_YEAR,
  REQUEST_COUNTRIES,
  RECIEVE_COUNTRIES,
  REQUEST_HOLIDAYS,
  RECIEVE_HOLIDAYS
} from '../actions'

const initialState = {
  countries: [],
  holidays:[],
  country:'',
  year:''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRY:
      return {
        ...state,
        country: action.value
      }
    case SET_YEAR:
      return {
        ...state,
        year: action.value
      }
    case REQUEST_COUNTRIES:
      return state
    case RECIEVE_COUNTRIES:
      return {
        ...state,
        countries: action.value
      }
    case REQUEST_HOLIDAYS:
      return state
    case RECIEVE_HOLIDAYS:
      return {
        ...state,
        holidays: action.value
      }
    default:
      return state
  }
}

export default rootReducer;