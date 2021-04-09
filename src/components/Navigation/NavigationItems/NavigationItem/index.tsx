import React, {LinkHTMLAttributes}  from 'react';
import { NavLink } from 'react-router-dom';
import {Li} from './styles';

type LinkProps = LinkHTMLAttributes<HTMLLinkElement> & {
    to: string,
    exact?: string,
}

const NavigationItem: React.FC<LinkProps> = ({children, to, exact,}) => {
    return (
        <Li>
            <NavLink to={to} exact >
                {children}
            </NavLink>
        </Li>
    );
}

export default NavigationItem;