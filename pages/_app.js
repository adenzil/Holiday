
import CountrySelector from '../components/CountrySelector';

function App({ Component, pageProps }) {
  return <Component 
            {...pageProps} 
            CountrySelector={CountrySelector}
          />
}

export default App