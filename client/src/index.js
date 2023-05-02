import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home.js';

import {Router, Routes , Route} from 'react-router-dom';
import history from './history';

ReactDOM.render
(
    <Router history={history}>
        <Routes>
            <Route exact path='/' element={<Home/>} />
        </Routes>
    </Router>,
    document.getElementById('root')
);