import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import NewBet from '../pages/NewBet';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/signup' component={SignUp} />
            <Route path='/dashboard' isPrivate component={Dashboard} />
            <Route path='/account' isPrivate component={Account} />
            <Route path='/new-bet' isPrivate component={NewBet} />
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Routes;