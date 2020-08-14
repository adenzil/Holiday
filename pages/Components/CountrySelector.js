import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCountry } from '../actions'

export default () => {

  const dispatch = useDispatch()

  const country = useSelector((state) => state.country)
  const countries = useSelector((state) => state.countries)

  return (
    <React.Fragment>
      <h2>Countries</h2>
      <select onChange={e => dispatch(selectCountry(e.target.value))} value={country}>
        <option>Select a country</option>
        {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
    </React.Fragment>
  )
}