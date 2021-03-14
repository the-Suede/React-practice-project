import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './utils/rem';
import './css/App.scss';
import './css/common.css';
import './css/layout.scss';

import Home from './views/Home';
import Category from './views/Category';
import Search from './views/Search';
import Cart from './views/Cart';
import Mine from './views/Mine';
import Login from './views/Login';
import Reg from './views/Reg';
import Detail from './views/Detail';
import Payment from './views/Payment';

function App() {
    return (
        <>
            <Switch>
                <Route path='/home' component={Home} exact />
                <Route path='/category' component={Category} exact />
                <Route path='/search' component={Search} exact />
                <Route path='/cart' component={Cart} exact />
                <Route path='/mine' component={Mine} exact />
                <Route path='/login' component={Login} exact />
                <Route path='/reg' component={Reg} exact />
                <Route path='/payment' component={Payment} exact />
                <Route path='/detail/:id' component={Detail} exact />
                <Route path='/notfound' render={() => <div>404</div>} exact />
                <Redirect from='/' to='/home' exact />
                <Redirect to='/notfound' />
            </Switch>
        </>
    )
};

export default App