import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'

function Home() {

  const numberOfYears = 1
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [year, setYear] = useState("")
  const [holidays, setHolidays] = useState([])

  // To fetch .env variables from next.config.js
  const {publicRuntimeConfig} = getConfig()
  const {holidayApiURL, holidayApiKey} = publicRuntimeConfig

  useEffect(() => {
    const savedCountries = localStorage.getItem("countries");
    if (savedCountries) {
      setCountries(JSON.parse(savedCountries));
    } else {
      fetch(holidayApiURL + 'countries?key=' + holidayApiKey)
        .then(res => res.json())
        .then((data)  => {
          setCountries(data.countries)
          localStorage.setItem("countries", JSON.stringify(data.countries))
        })
    }
  }, []);

  var yearsArray = []
  for (var i = previousYear(); i > previousYear()-numberOfYears; i--) {
    yearsArray.push(<option key={i}> {i} </option>)
  }

  function fetchHolidays() {
    fetch(holidayApiURL + 'holidays?key=' + holidayApiKey+'&country=' + country + '&year=' + year)
      .then(res => res.json())
      .then((data)  => {
        setHolidays(data.holidays)
      })
  }

  return (
    <div className="container">
      <Head>
        <title>Holiday Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Search for a Holiday!
        </h1>
        <h2>Countries</h2>
        <select onChange={e => setCountry(e.target.value)}>
        <option>Select a country</option>
        {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
        </select>
        <h2>Year</h2>
        <select disabled = {!country} onChange={e => setYear(e.target.value)}>
        <option>Select a year</option>
        { yearsArray }
        </select>
        <h2></h2>
        <button disabled = {!year} onClick={fetchHolidays}> <h3> List holidays </h3> </button>
        <h2>Holidays</h2>
        <ul>
        {holidays.map(holiday => <li key={holiday.uuid} value={holiday.uuid}>{holiday.date} - {holiday.name}</li>)}
        </ul>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

function previousYear() {
  return new Date().getFullYear() - 1
}

export default Home
