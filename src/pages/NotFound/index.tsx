import React from 'react';
import Footer from '../../components/Footer';
import img from '../../assets/teste2.svg';
import { Container } from './styles';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <>
        <Container>
            <img src={img} alt=""/>
            <h1>Sorry, nothing here</h1>
            <Link to="/">Go to existing page</Link>
        </Container>
        
        <Footer/>
        </>
    )
}

export default NotFound;