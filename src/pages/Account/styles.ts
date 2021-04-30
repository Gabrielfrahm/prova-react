import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    > a {
        color: #707070;
        border:none;
        background: transparent;
        font-size: 30px;
        padding: 22px 90px 33px 90px;
        font-style: italic;
        font-weight: bold;
        text-decoration: none;
    }

    > a:hover{
        color: ${shade(0.2, '#707070' )}
    }
    
        form {
            margin-top: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        
            
            h1 {
                font-size: 35px;
                font-weight: bold;
                margin-bottom: 26px;
                font-style: italic;
            }

            > div {
                background-color: #FFFFFF;
                border: 2px solid #EBEBEB;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                -webkit-box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.39);
                -moz-box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.39);
                box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.39); 

                a {
                    list-style: none;
                    text-decoration: none;
                    color: #C1C1C1;
                    font-style: italic;
                    font-size: 14px;
                    align-self: flex-end;
                    padding: 16px;
                }

                
            }
        }
`;


