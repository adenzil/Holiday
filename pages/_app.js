import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import {useRouter} from 'next/router'
import CountrySelector from './Components/CountrySelector'
import rootReducer from './reducers'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const country = useSelector((state) => state.country)
  const year = useSelector((state) => state.year)

  const [countries, setCountries] = useState([])
  const [years, setYears] = useState([new Date().getFullYear() - 1])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/holidays?country=${country}&year=${year}`)
  }

  const changeCountry = value => {
    dispatch({type:'SET_COUNTRY', value})
  }

  const changeYear = value => {
    dispatch({type:'SET_YEAR', value})
  }

  if(!country && router.query.country) {
    changeCountry(router.query.country)
  }
  if(!year && router.query.year) {
    changeYear(router.query.year)
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
          <CountrySelector changeCountry={changeCountry} countries={countries} country={country} />
          <h2>Year</h2>
          <select disabled = {!country} onChange={e => changeYear(e.target.value)} value={year}>
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
    </div>
  )
}

const AppWrapper = ({ Component, pageProps }) => {
  const store = createStore(rootReducer)

  return (
    <Provider store={store}>
      <App />
      <Component 
        {...pageProps}
      />
    </Provider>
  )
}

export default AppWrapper