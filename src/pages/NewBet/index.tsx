import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import ButtonGames from '../../components/ButtonGames';

// import Numbers from '../../components/Numbers';
import { GamesProps } from '../../store/modules/games/types';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
// import Numbers from '../../components/Numbers';
import {
    Container,
    Content,
    Title,
    SectionGame,
    Cart,
    ButtonGamesDiv,
} from './styles';


const NewBet: React.FC = () => {
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });
    
    //state of active button 
    const [active, setActive] = useState(false);
    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');
    
    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);
    
    const [numbers, setNumbers] = useState<Number[]>([]);

    useEffect(() => {
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
    }, [betsState, gameSelected]);
    
    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(true);
    }, []);

    useEffect(() => {
        infoGame.map(game => {
            let count = 0;
            for(let i = 1; i <= game.range; i++ ){
                count++;
                console.log(i);
            }

            return count;
        })
    },[infoGame]);

    console.log(numbers);

    return (
        <>
            <Menu />
            <Container>
                <SectionGame>
                    <Title><strong>NEW BET</strong> FOR {gameSelected.toUpperCase()}</Title>
                    <span>Choose a game</span>
                    <ButtonGamesDiv>
                        {!errorState
                            ? betsState.map(game => (
                                <ButtonGames
                                    onClick={() => handleClickedInButtonGame(game.type)}
                                    isActive={game.type === gameSelected ? active : false}
                                    type='button'
                                    key={game.type}
                                    color={game.color}
                                >{game.type}</ButtonGames>
                            ))
                            : <p>erro ao carregar os jogos</p>
                        }
                    </ButtonGamesDiv>
                    <span>Fill your bet</span>
                    {infoGame.map(game =>(
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