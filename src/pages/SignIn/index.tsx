import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import {useSelector } from 'react-redux';

import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Presentation } from './styles';
// import { signInRequest } from '../../store/modules/auth/action';
// import { IState } from '../../store';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';


interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const history = useHistory();
    const { signIn } = useAuth();
    const { addToast } = useToast();



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

                await signIn({
                    email: data.email,
                    password: data.password
                });

                history.push('/dashboard');

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    type: 'error',
                    title: err.message,
                    description: 'Ocorreu um erro ao fazer login cheque as credenciais',
                });
            }
        }, [history, signIn, addToast]);

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
                        <h1>Authentication</h1>
                        <div>
                            <Input name="email" placeholder="Email" />
                            <Input name="password" type="password" placeholder="Password" />
                            <Link to="/forgot-password">I forget my password </Link>
                            <Button type="submit">Log In  <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                        </div>
                    </Form>
                    <Link to='/signup'>Sign Up  <FiArrowRight style={{ verticalAlign: 'middle' }} /></Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default SignIn;