import Head from 'next/head'
import rootReducer from '../store/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from '../components/App/container/AppHoc'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';

const AppWrapper = ({ Component, pageProps }) => {
  const store = createStore(rootReducer, applyMiddleware(thunk))

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