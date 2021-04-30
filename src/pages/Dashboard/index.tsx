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
import Bet from '../../components/Bet';
import { formatValue } from '../../utils/formatValue';
import { formatDate } from '../../utils/formatDate';
import { loadGames } from '../../store/modules/games/action';
import api from '../../server/api';
import Backdrop from '../../components/Backdrop';
import { Spin } from '../../components/Spinner/styles';

export interface ShowBetsProps {
    id: number;
    color: string;
    type: string;
    price: number;
    numbers: string;
    created_at: Date;
    game: GamesProps;
};

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();

    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    const [games, setGames] = useState<ShowBetsProps[]>([]);

    //state of active button 
    const [active, setActive] = useState(false);

    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const [gameFind, setGameFind] = useState<ShowBetsProps[]>([]);

    const [showSide, setShowSide] = useState(true);

    const history = useHistory();

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    useEffect(() => {
        api.get('/game/bets').then(
            response => {
                setGames(response.data)
            }
        );
    }, []);

    useEffect(() => {//initial bet
        betsState.filter(item => item.type === gameSelected ?
            api.get(`/game/bets/${item.id}`).then(
                response => {
                    console.log(response.data)
                    setGameFind(response.data)
                }
            )
            : []
        );
    }, [betsState, gameSelected]);


    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(!active);
    }, [active]);

    const handleToClickInNewBet = useCallback(() => {
        history.push('/new-bet')
    }, [history])

    const handleSideDrawerClosed = useCallback(() => {
        setShowSide(true);
    }, []);

    return (
        <>
            <Menu />
            <Container >
                <Content>
                    <Title>RECENT GAMES</Title>
                    <span>Filters</span>
                    {errorState
                        ?
                        <Backdrop  show={showSide} clicked={handleSideDrawerClosed}>
                            <Spin />
                            <p style={{color: 'red', textAlign: 'center'}}>Ops algo deu errado contante o administrador</p>
                        </Backdrop>
                        : betsState.map(game => (
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
                    }
                    <Button onClick={handleToClickInNewBet}>New Bet <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                </Content>
                <ShowBet>

                    {
                        !active && games.length !== 0
                            ?
                            games.map(item => (
                                <Bet
                                    key={uuid()}
                                    price={formatValue(item.price)}
                                    color={item.game.color}
                                    numbers={item.numbers}
                                    date={formatDate(String(item.created_at))}
                                    betType={item.game.type}
                                />
                            ))
                            :
                            gameSelected !== '' ? null : <p>Empty 😢</p>
                    }

                    {
                        active && gameFind.length === 0
                            ? <p>Empty 😢 {gameSelected}</p>
                            : gameFind.map(item => (
                                <Bet
                                    key={uuid()}
                                    price={formatValue(item.price)}
                                    color={item.game.color}
                                    numbers={item.numbers}
                                    date={formatDate(String(item.created_at))}
                                    betType={item.game.type}
                                />
                            ))
                    }
                </ShowBet>
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard;

