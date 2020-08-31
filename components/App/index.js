import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CountrySelector from '../CountrySelector/container/CountrySelectorHoc'
import PropTypes from 'prop-types'
import Loader from '../Loader'

const App = ({ country, year, countries, changeCountry, changeYear, loadingHolidays }) => {

  const router = useRouter()

  const [years, setYears] = useState([new Date().getFullYear() - 1])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/holidays?country=${country}&year=${year}`)
  }

  if(!country && router.query.country) {
    changeCountry(router.query.country)
  }
  if(!year && router.query.year) {
    changeYear(router.query.year)
  }

  if(loadingHolidays) {
    return <Loader />
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

App.propTypes = {
  country: PropTypes.string,
  year: PropTypes.string,
  countries: PropTypes.array,
  changeCountry: PropTypes.func,
  changeYear: PropTypes.func
}

export default App