import { useRouter } from 'next/router'
import { useState } from 'react'
import getConfig from 'next/config'

const Holidays = () => {
  const router = useRouter()
  const { country, year } = router.query

  const [holidays, setHolidays] = useState([])

  // To fetch .env variables from next.config.js
  const {publicRuntimeConfig} = getConfig()
  const {holidayApiURL, holidayApiKey} = publicRuntimeConfig

  if(country && year) {
    fetchHolidays()
  }

  function fetchHolidays() {
    fetch(holidayApiURL + 'holidays?key=' + holidayApiKey+'&country=' + country + '&year=' + year)
      .then(res => res.json())
      .then((data)  => {
        setHolidays(data.holidays)
      })
  }

  return  (
    <div>
      <h2>Holidays</h2>
      <ul>
        {holidays.map(holiday => <li key={holiday.uuid} value={holiday.uuid}>{holiday.date} - {holiday.name}</li>)}
      </ul>
    </div>
  )
}

export default Holidays