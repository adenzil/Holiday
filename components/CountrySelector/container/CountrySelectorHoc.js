import { connect } from 'react-redux'
import { selectCountry, fetchCountries } from '../../../store/actions'
import CountrySelector from '../index.js'

const mapStateToProps = ( { country, countries } ) => {
  return {
    country,
    countries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCountry(country) {
      dispatch(selectCountry(country));
    },
    loadCountries() {
      dispatch(fetchCountries())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector)