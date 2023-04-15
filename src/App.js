import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Main from './container/Main'

/* Styles */
import './assets/less/index.less';
import './assets/scss/index.scss';

export const App = () => {

    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    )
}

export default App;