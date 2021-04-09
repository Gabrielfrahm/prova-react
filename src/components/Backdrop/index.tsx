import React  from 'react';
import {BackdropDiv} from './styles';

interface BackdropProps {
    show: boolean,
    clicked: () => void,
}

const Backdrop: React.FC<BackdropProps> = ({show, clicked}) => {
    
    return (
        show ? <BackdropDiv onClick={clicked}></BackdropDiv> : null
    )
}

export default Backdrop;