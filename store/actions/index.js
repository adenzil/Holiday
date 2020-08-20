import getConfig from 'next/config'

// To fetch .env variables from next.config.js
const {publicRuntimeConfig} = getConfig()
const {holidayApiURL, holidayApiKey} = publicRuntimeConfig


import {
  SET_COUNTRY,
  SET_YEAR,
  RECIEVE_COUNTRIES,
  REQUEST_HOLIDAYS,
  RECIEVE_HOLIDAYS
} from './action_types'

function receiveCountries(value) {
  return {
    type: RECIEVE_COUNTRIES,
    value
  }
}

function receiveHolidays(value) {
  return {
    type: RECIEVE_HOLIDAYS,
    value
  }
}

export const loadHolidays = () => ({
  type: REQUEST_HOLIDAYS
})

export const selectCountry = value => ({
  type: SET_COUNTRY,
  value
})

export const selectYear = value => ({
  type: SET_YEAR,
  value
})

export function fetchCountries() {
  return dispatch => {
    const savedCountries = localStorage.getItem("countries");
    if (savedCountries) {
      return dispatch(receiveCountries(JSON.parse(savedCountries)))
    }
    return fetch(holidayApiURL + 'countries?key=' + holidayApiKey)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("countries", JSON.stringify(data.countries))
        dispatch(receiveCountries(data.countries))
      })
  }
}

export function fetchHolidays(country, year) {
  return dispatch => {
    return fetch(holidayApiURL + `holidays?country=${country}&year=${year}&key=${holidayApiKey}`)
      .then(response => response.json())
      .then(data => dispatch(receiveHolidays(data.holidays)))
  }
}