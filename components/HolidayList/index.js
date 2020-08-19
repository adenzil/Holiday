import { useEffect } from 'react'
import PropTypes from 'prop-types'

const HolidayList = ({ country, year, holidays, fetchHolidays }) => {

  useEffect(() => {
    if(country && year) {
      fetchHolidays(country, year)
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

HolidayList.propTypes = {
  country: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  holidays: PropTypes.array.isRequired
}

export default HolidayList