import App from '../index.js'
import { connect } from 'react-redux'
import { selectCountry, selectYear, fetchCountries, receiveCountries } from '../../../store/actions'

const mapStateToProps = ( { country, year, countries } ) => {
  return {
    country,
    year,
    countries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCountry(value) {
      dispatch(selectCountry(value))
    },
    changeYear(value) {
      dispatch(selectYear(value))
    },
    loadCountries() {
      dispatch(fetchCountries())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)