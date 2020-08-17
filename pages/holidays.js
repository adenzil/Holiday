import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchHolidays } from '../store/actions'

const mapStateToProps = (state) => {
  const { country, year, holidays } = state
  return {
    country,
    year,
    holidays
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const Holidays = ({ country, year, holidays }) => {

  const dispatch = useDispatch()

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

export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
