import React from 'react';
import NavigationItem from './NavigationItem';
import {FiArrowRight} from 'react-icons/fi'

import {Ul} from './styles';
const NavigationItems: React.FC = () => {
    return(
        <Ul>
            <NavigationItem to="/account">Account</NavigationItem>
            <NavigationItem to="/">Log out <FiArrowRight  style={{verticalAlign: 'middle'}} size={25}/></NavigationItem>
        </Ul>
    )   
}


export default NavigationItems;