import getConfig from 'next/config'

// To fetch .env variables from next.config.js
const {publicRuntimeConfig} = getConfig()
const {holidayApiURL, holidayApiKey} = publicRuntimeConfig


export const SET_COUNTRY = 'SET_COUNTRY'
export const SET_YEAR = 'SET_YEAR'
export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES'
export const RECIEVE_COUNTRIES = 'RECIEVE_COUNTRIES'
export const REQUEST_HOLIDAYS = 'REQUEST_HOLIDAYS'
export const RECIEVE_HOLIDAYS = 'RECIEVE_HOLIDAYS'

function requestCountries() {
  return {
    type: REQUEST_COUNTRIES
  }
}

function receiveCountries(data) {
  localStorage.setItem("countries", JSON.stringify(data.countries))
  return {
    type: RECEIVE_POSTS,
    countries: data.countries
  }
}

function requestHolidays(country, year) {
  return {
    type: REQUEST_COUNTRIES
  }
}

function receiveHolidays(data) {
  return {
    type: RECEIVE_HOLIDAYS,
    countries: data.holidays
  }
}

export const selectCountry = value => ({
  type: 'SET_COUNTRY',
  value
})

export const selectYear = value => ({
  type: 'SET_YEAR',
  value
})

function fetchCountries() {
  return dispatch => {
    dispatch(requestCountries())
    return fetch(holidayApiURL + 'countries?key=' + holidayApiKey)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function fetchHolidays(country, year) {
  return dispatch => {
    dispatch(requestHolidays())
    return fetch(holidayApiURL + `/holidays?country=${country}&year=${year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveHolidays(json)))
  }
}