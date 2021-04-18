import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import NewBet from '../pages/NewBet';
import NotFound from '../pages/NotFound';


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/signup' component={SignUp} />
            <Route path='/dashboard' isPrivate component={Dashboard} />
            <Route path='/new-bet' isPrivate component={NewBet} />
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Routes;