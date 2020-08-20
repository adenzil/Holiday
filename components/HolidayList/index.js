import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap';

const HolidayList = ({ country, year, holidays, fetchHolidays, loadingHolidays }) => {

  useEffect(() => {
    if(country && year) {
      fetchHolidays(country, year)
    }
  }, [country, year]);

  if(loadingHolidays) {
    return (
      <Fragment>
        <Spinner animation="border" />
      </Fragment>
    )
  }

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