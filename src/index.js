import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <RecoilRoot>
        <Provider store={configureStore({})}>
            <App />
        </Provider>
    </RecoilRoot>,
    document.getElementById('root')
);
