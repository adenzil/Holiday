import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'

const Holidays = (props) => {

  const router = useRouter()
  const { country, year } = props

  const [holidays, setHolidays] = useState([])

  // To fetch .env variables from next.config.js
  const {publicRuntimeConfig} = getConfig()
  const {holidayApiURL, holidayApiKey} = publicRuntimeConfig

  useEffect(() => {
    if(country && year) {
      fetch(holidayApiURL + 'holidays?key=' + holidayApiKey+'&country=' + country + '&year=' + year)
      .then(res => res.json())
      .then((data)  => {
        setHolidays(data.holidays)
      })
    }
  }, [country, year]);

  return  (
    <div>
      <ul>
        {holidays.map(holiday => <li key={holiday.uuid} value={holiday.uuid}>{holiday.date} - {holiday.name}</li>)}
      </ul>
    </div>
  )
}

export default Holidays