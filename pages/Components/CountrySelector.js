import { useContext } from 'react'
import { selectCountry } from '../actions'

export default ({ changeCountry, countries, country }) => {
  
  return (
    <React.Fragment>
      <h2>Countries</h2>
      <select onChange={e => changeCountry(e.target.value)} value={country}>
        <option>Select a country</option>
        {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
    </React.Fragment>
  )
}