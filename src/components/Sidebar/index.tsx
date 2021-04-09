import React from 'react';
import Backdrop from '../Backdrop';
import Logo from '../Logo';
import NavigationItems from '../Navigation/NavigationItems';
import {SideDiv} from './styles';

interface SidebarProps {
    open: boolean,
    closed: () => void,
}

const Sidebar : React.FC<SidebarProps> = ({open, closed}) =>{
    let toggleStyled = 'translateX(-100%)';
    if(open ){
        toggleStyled = 'translateX(0)'
    }

    return (
        <>
            <Backdrop 
                show={open}
                clicked={closed}
            />
            <SideDiv style={{transform: toggleStyled}}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </SideDiv>
        </>
    )
}

export default Sidebar;