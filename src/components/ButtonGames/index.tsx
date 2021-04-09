import React, {ButtonHTMLAttributes} from 'react';

import {Container} from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: string;
    isActive?: boolean;
    
}

const ButtonGames: React.FC<ButtonProps> = ({
    children, color, isActive, ...rest
}) => {
    return (
        <Container isActive={isActive} color={color} type="button" {...rest}>
           {children}
        </Container>
    );
}

export default ButtonGames; 