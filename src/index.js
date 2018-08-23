import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './store/Reducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducer)
const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));
// ReactDOM.unmountComponentAtNode(document.getElementsByClassName('bubble-legend')[0]);
registerServiceWorker();
