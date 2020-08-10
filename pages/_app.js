import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useRef, useState, useEffect } from 'react'
import getConfig from 'next/config'
import {useRouter} from 'next/router'

function App({ Component, pageProps }) {

  const router = useRouter()

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [year, setYear] = useState("")
  const [years, setYears] = useState([new Date().getFullYear() - 1])

  const countryRef = useRef()
  const yearRef = useRef()

  if(!country && router.query.country) {
    setCountry(router.query.country)
    countryRef.current.value = router.query.country
  }
  if(!year && router.query.year) {
    setYear(router.query.year)
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/holidays?country=${countryRef.current.value}&year=${yearRef.current.value}`)
  }

  return (
    <div>
      <Head>
        <title>Holiday Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Search for a Holiday!
        </h1>
        <form onSubmit={handleSubmit}>
          <h2>Countries</h2>
          <select ref={countryRef} onChange={e => setCountry(e.target.value)}>
            <option>Select a country</option>
            {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
          </select>
          <h2>Year</h2>
          <select disabled = {!country} ref={yearRef} onChange={e => setYear(e.target.value)}>
            <option>Select a year</option>
            { years.map(year => <option key={year}>{year}</option>) }
          </select>
          <h2></h2>
          <button disabled = {!year}> <h3> List holidays </h3> </button>
        </form>
      </main>

      <style jsx>{`
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
      <Component 
        {...pageProps} 
        country={country}
        year={year}
      />
    </div>
  )
}

export default App