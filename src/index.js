import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import reducers from './Reducers/index'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
//Styles
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rduxStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={rduxStore}>
        <App />
    </Provider>,
    document.getElementById('root')
)