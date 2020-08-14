import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHolidays } from './actions'

const Holidays = (props) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const country = useSelector((state) => state.country)
  const year = useSelector((state) => state.year)
  const holidays = useSelector((state) => state.holidays)

  useEffect(() => {
    if(country && year) {
      fetchHolidays(country, year)(dispatch)
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