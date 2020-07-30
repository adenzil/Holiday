import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'

function Home() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const savedCountries = localStorage.getItem("countries");
    if (savedCountries) {
      setCountries(JSON.parse(savedCountries));
    } else {
      // To fetch .env variables from next.config.js
      const {publicRuntimeConfig} = getConfig()
      const {holidayApiURL, holidayApiKey} = publicRuntimeConfig

      fetch(holidayApiURL + 'countries?key=' + holidayApiKey)
        .then(res => res.json())
        .then((data)  => {
          setCountries(data.countries)
          localStorage.setItem("countries", JSON.stringify(data.countries))
        })
    }
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
        <Years />
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

function Years() {
  var numberOfYears = 5
  var currentYear = new Date().getFullYear()
  var yearsArray = []
  
  for (var i = currentYear; i >= currentYear-numberOfYears; i--) {
    yearsArray.push(<option key={i}> {i} </option>)
  }

  return (
    <select>
      {yearsArray}
    </select>
  );
}

export default Home
