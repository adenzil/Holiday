import Head from 'next/head'
import rootReducer from '../store/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../components/App'

const AppWrapper = ({ Component, pageProps }) => {
  const store = createStore(rootReducer)

  return (
    <Provider store={store}>
      <App />
      <Component 
        {...pageProps}
      />
    </Provider>
  )
}

export default AppWrapper