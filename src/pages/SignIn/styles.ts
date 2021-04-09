import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    align-items: stretch; 
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;

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

export const Presentation = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    

    h2 {
        font-size: 65px;
        max-width: 244px;
        font-weight: bold;
        text-align: center;
    }

    h1{
        font-size: 83px;
        font-weight: bold;
        text-align: center;
    }

    span {
        background-color: #B5C401;
        width:144px;
        padding: 7px;
        color: #fff;
        font-size: 22px;
        border-radius: 25px;
        text-align: center;
        margin: 37px 0 26px;
    }

    @media (max-width: 800px){
        display: none;
    }
    
`;


