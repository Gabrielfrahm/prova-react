import React, { useCallback } from 'react';
import NavigationItem from './NavigationItem';
import {FiArrowRight} from 'react-icons/fi'

import {Ul} from './styles';
import { signOut } from '../../../hooks/auth';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const NavigationItems: React.FC = () => {
    const history = useHistory();

    const logout = useCallback(() => {
        signOut();
        history.push('/');
    },[history])

    return(
        <Ul>
            <NavigationItem to="/account">Account</NavigationItem>
            <Link onClick={logout} to="/">Log out <FiArrowRight  style={{verticalAlign: 'middle'}} size={25}/></Link>
        </Ul>
    )   
}


export default NavigationItems;