import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import api from '../../server/api';
import ButtonGames from '../../components/ButtonGames';

// import Numbers from '../../components/Numbers';
import {
    Container,
    Content,
    Title,
    SectionGame,
    Cart,
    ButtonGamesDiv,
} from './styles';

interface GamesProps {
    type: string;
    color: string;
    description: string;
    range: number;
    price: number;
    'min-cart-value': number;
    'max-number': number;
}

const NewBet: React.FC = () => {
    //state of active button 
    const [active, setActive] = useState(false);
    //state of games
    const [games, setGames] = useState<GamesProps[]>([]);
    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('LOTOFÁCIL');

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);

    // const [count, setCount] = useState(0);

    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(true);
    }, []);




    useEffect(() => {
        setInfoGame(games.filter(game => { return gameSelected === game.type }));
    }, [games, gameSelected]);

    useEffect(() => {
        api.get('/types').then(
            response => {
                setGames(response.data);
            }
        ).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
            <Menu />
            <Container>
                <SectionGame>
                    <Title><strong>NEW BET</strong> FOR {gameSelected.toUpperCase()}</Title>
                    <span>Choose a game</span>
                    <ButtonGamesDiv>
                        {games.map(game => (
                            <ButtonGames
                                onClick={() => handleClickedInButtonGame(game.type)}
                                isActive={gameSelected === game.type ? active : false}
                                type='button'
                                key={game.type}
                                color={game.color}
                            >{game.type}</ButtonGames>
                        ))}
                    </ButtonGamesDiv>
                    <span>Fill your bet</span>
                    {infoGame.map(game => (
                        <div key={game.type}>
                            <p>{game.description}</p>
                            
                        </div>
                    ))}
                    
                </SectionGame>
                <Content>
                    <Cart><h1>Cart</h1></Cart>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default NewBet;