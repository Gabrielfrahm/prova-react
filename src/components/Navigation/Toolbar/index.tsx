import React from 'react';
import NavigationItems from '../NavigationItems';
import Logo from '../../Logo';
import {Header,Nav} from './styles';
import MenuBurger from '../../Sidebar/MenuBurger';

interface ToolbarProps {
    drawerToggleClicked: () => void,
}

const Toolbar : React.FC<ToolbarProps> = ({drawerToggleClicked}) => {
    
    return (
        <Header>
            <MenuBurger clicked={drawerToggleClicked} />
            <Logo />
            <Nav>
                <NavigationItems />
            </Nav>
        </Header>
    )
}


export default Toolbar;