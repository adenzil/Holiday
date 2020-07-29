import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'

// To fetch .env variables from next.config.js
const {publicRuntimeConfig} = getConfig()
const {holidayApiKey} = publicRuntimeConfig

function Home(props) {

  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    fetch('https://holidayapi.com/v1/countries?key='+holidayApiKey)
    .then(res => res.json())
    .then(data  => setCountries(data.countries))
  }, []);

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
        <select>
        {countries.map(country => <option key={country.code}>{country.name}</option>)}
        </select>
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

export default Home
