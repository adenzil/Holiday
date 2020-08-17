import { useContext } from 'react'
import { connect } from 'react-redux'
import { selectCountry } from '../store/actions'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  const { country, countries } = state
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

const CountrySelector = ({ country, countries, selectCountry }) => {

  return (
    <React.Fragment>
      <h2>Countries</h2>
      <select onChange={e => selectCountry(e.target.value)} value={country}>
        <option>Select a country</option>
        {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
    </React.Fragment>
  )
}

CountrySelector.propTypes = {
  country: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired,
  selectCountry: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);