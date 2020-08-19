import App from '../index.js'
import { connect } from 'react-redux'
import { selectCountry, selectYear } from '../../../store/actions'

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)