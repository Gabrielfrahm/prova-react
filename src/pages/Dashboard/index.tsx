import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ButtonGames from '../../components/ButtonGames';
import Footer from '../../components/Footer';
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../components/Menu';

import { IState } from '../../store';
import { Container, Content, Title, Button, ShowBet } from './styles';
import { GamesProps } from '../../store/modules/games/types';
import { Item } from '../../store/modules/itemCart/type';
import Bet from '../../components/Bet';
import { formatValue } from '../../utils/formatValue';
import { formatDate } from '../../utils/formatDate';
import { loadGames } from '../../store/modules/games/action';
import api from '../../server/api';


const Dashboard: React.FC = () => {
    const dispatch = useDispatch();

    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    const bets = useSelector<IState, Item[]>(state => {
        return state.itemCart.bets;
    })

    const [games, setGames] = useState<Item[]>([]);

    //state of active button 
    const [active, setActive] = useState(false);

    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const [filterGame, setFilterGame] = useState<Item[]>([]);

    const history = useHistory();

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    const handleFilterGame = useCallback(() => {
        const game = games.filter(item => {
            return item.type === gameSelected;
        });
        setFilterGame(game);
    }, [games, gameSelected])

    useEffect(() => {//initial bet
        handleFilterGame();
    }, [handleFilterGame]);

    useEffect(() => {
        api.get('/game/bets').then(
            response => {
                setGames(response.data)
            }
        );

    }, []);

    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);

        setActive(true);
    }, []);

    const handleToClickInNewBet = useCallback(() => {
        history.push('/new-bet')
    }, [history])

    console.log(new Date())

    return (
        <>
            <Menu />
            <Container >
                <Content>
                    <Title>RECENT GAMES</Title>
                    <span>Filters</span>
                    {!errorState
                        ? betsState.map(game => (
                            <ButtonGames
                                onClick={() => handleClickedInButtonGame(game.type)}
                                isActive={gameSelected === game.type ? active : false}
                                type='button'
                                key={game.type}
                                color={game.color}
                            >
                                {game.type}
                            </ButtonGames>
                        ))
                        : <p>Erro ao carregar os jogos</p>
                    }
                    <Button onClick={handleToClickInNewBet}>New Bet <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                </Content>
                <ShowBet>
                    {/* {games.map(item => (

                        <Bet
                            key={uuid()}
                            price={formatValue(item.price)}
                            color={item.color}
                            numbers={item.numbers}
                            date={item.created_at.toLocaleString()}
                            betType={item.type}
                        />


                    ))} */}
                    {filterGame.length !== 0
                        ? filterGame.map(item => (
                            <Bet
                                key={uuid()}
                                price={formatValue(item.price)}
                                color={item.color}
                                numbers={item.numbers}
                                date={formatDate(item.created_at)}
                                betType={item.type}
                            />
                        ))
                        : <p>Empty 😢 {gameSelected}</p>
                        // : bets.map(item => {
                        //     return (
                        //         <Bet
                        //             key={uuid()}
                        //             price={formatValue(item.price)}
                        //             color={item.color}
                        //             numbers={item.numbers}
                        //             date={formatDate(item.date)}
                        //             betType={item.type}
                        //         />
                        //     )
                        // })
                    }
                </ShowBet>
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard;

