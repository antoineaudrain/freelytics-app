import { createStore, compose } from 'redux'
import rootReducer from './reducers'

const enhancersList = []
// eslint-disable-next-line
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__

if (typeof devToolsExtension === 'function') {
  enhancersList.push(devToolsExtension())
}

const composedEnhancer = compose(...enhancersList)

export default createStore(rootReducer, {}, composedEnhancer)
