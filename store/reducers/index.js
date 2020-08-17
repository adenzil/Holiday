import { combineReducers } from 'redux'

import {
  SET_COUNTRY,
  SET_YEAR,
  RECIEVE_COUNTRIES,
  RECIEVE_HOLIDAYS
} from '../actions/action_types'

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
    case RECIEVE_COUNTRIES:
      return {
        ...state,
        countries: action.value
      }
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