import React, { useCallback, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ButtonGames from '../../components/ButtonGames';
import Footer from '../../components/Footer';
import api from '../../server/api';

import { Container, Content, Title, Button } from './styles';
import Menu from '../../components/Menu';

interface GamesProps {
    type: string;
    color: string;
    description: string;
    range: number;
    price: number;
    'min-cart-value': number;
    'max-number': number;
}

const Dashboard: React.FC = () => {
    //state of active button 
    const [active, setActive] = useState(false);
    //state of games of json
    const [games, setGames] = useState<GamesProps[]>([]);
    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const history = useHistory();

    
    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        console.log(gameName)
        setActive(true);
    }, []);

    useEffect(() => {
        api.get('/types').then(
            response => {
                setGames(response.data);
            }
        ).catch(err => {
            console.log(err);
        })
    }, []);

    const handleToClickInNewBet = useCallback(()=> {
        history.push('/new-bet')
    },[history])

    return (
        <>
            <Menu />
            <Container >
                <Content>
                    <Title>RECENT GAMES</Title>
                    <span>Filters</span>
                    {games.map(game => (
                        <ButtonGames
                            onClick={() => handleClickedInButtonGame(game.type)}
                            isActive={gameSelected === game.type ? active: false }
                            type='button'
                            key={game.type}
                            color={game.color}
                        >
                            {game.type}
                        </ButtonGames>
                    ))}
                    <Button onClick={handleToClickInNewBet}>New Bet <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                </Content>
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard;