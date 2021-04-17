import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Span, Hr, Container} from './styles';



const Logo : React.FC = () => {
    const history = useHistory();
    return (
        <Container>
            <Span  >TGL <Hr /></Span> 
           {history.location.pathname !== '/dashboard' ? <Link to ="/dashboard">Home</Link> : <Link to ="#"></Link> }
        </Container>
    );
}

export default Logo;