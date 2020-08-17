import { useContext } from 'react'
import { connect } from 'react-redux'
import { selectCountry } from '../store/actions'


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

const CountrySelector = (props) => {

  return (
    <React.Fragment>
      <h2>Countries</h2>
      <select onChange={e => props.selectCountry(e.target.value)} value={props.country}>
        <option>Select a country</option>
        {props.countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);