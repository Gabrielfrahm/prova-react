import React from 'react';
// import { useDispatch } from 'react-redux';
// import { loadGames } from '../../store/modules/games/action';
import {Container} from './styles';

const Footer : React.FC = () => {

    // const dispatch = useDispatch();
    
    // useEffect(() => {
    //     dispatch(loadGames());
    // },[dispatch]);
    
    return (
        <Container><p>Copyright 2020 Luby Software</p></Container>
    );
}

export default Footer;