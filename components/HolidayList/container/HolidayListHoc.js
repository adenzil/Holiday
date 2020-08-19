import { connect } from 'react-redux'
import HolidayList from '../index.js'
import { fetchHolidays } from '../../../store/actions'

const mapStateToProps = ( { country, year, holidays } ) => {
  return {
    country,
    year,
    holidays
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHolidays(country, year) {
    	dispatch(fetchHolidays(country, year))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HolidayList);