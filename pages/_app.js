import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import CountrySelector from '../components/CountrySelector'
import rootReducer from '../store/reducers'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { receiveCountries, selectCountry, selectYear, fetchCountries } from '../store/actions'

const App = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const country = useSelector((state) => state.country)
  const year = useSelector((state) => state.year)
  const countries = useSelector((state) => state.countries)

  const [years, setYears] = useState([new Date().getFullYear() - 1])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/holidays?country=${country}&year=${year}`)
  }

  const changeCountry = value => {
    dispatch(selectCountry(value))
  }

  const changeYear = value => {
    dispatch(selectYear(value))
  }

  if(!country && router.query.country) {
    changeCountry(router.query.country)
  }
  if(!year && router.query.year) {
    changeYear(router.query.year)
  }

  useEffect(() => {
    const savedCountries = localStorage.getItem("countries");
    if (savedCountries) {
      dispatch(receiveCountries(JSON.parse(savedCountries)))
    } else {
      fetchCountries()(dispatch)
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
          <CountrySelector />
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