import { connect } from 'react-redux'
import { selectCountry } from '../../../store/actions'
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector)