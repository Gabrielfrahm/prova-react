import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import NewBet from '../pages/NewBet';


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/signup' component={SignUp} />
            <Route path='/dashboard'  component={Dashboard} />
            <Route path='/new-bet'  component={NewBet} />
        </Switch>
    )
}

export default Routes;