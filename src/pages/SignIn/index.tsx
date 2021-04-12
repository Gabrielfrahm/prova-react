import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Presentation } from './styles';
import { signInFailure, signInSuccess } from '../../store/modules/auth/action';
import { IState } from '../../store';
// import { UserState } from '../../store/modules/auth/types';



interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    // const state= useSelector<IState>(state => {
    //     if(state.users.users !== ''){
    //         return state.users.erro;
    //     }
    // } )
    

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail Obrigatório').email('Digite um Email valido'),
                    password: Yup.string().required('Senha Obrigatório'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                dispatch(signInSuccess({
                    email: data.email,
                    password: data.password
                }));
                // console.log(state);

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    dispatch(signInFailure(String(err)))
                    return;
                }
            }
        }, [dispatch]);

        
    return (
        <>
            <Container>
                <Presentation>
                    <h2>The Greatest App</h2>
                    <span>for</span>
                    <h1>LOTTERY</h1>
                </Presentation>
                <Content>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        {/* {state && <span>error</span>} */}
                        <h1>Authentication</h1>
                        <div>
                            <Input name="email" placeholder="Email" />
                            <Input name="password" type="password" placeholder="Password" />
                            <Link to="/reset-password">I forget my password </Link>
                            <Button  type="submit">Log In  <FiArrowRight  style={{verticalAlign: 'middle'}} /></Button>
                        </div>
                    </Form>
                    <Link to='/signup'>Sign Up  <FiArrowRight  style={{verticalAlign: 'middle'}} /></Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default SignIn;