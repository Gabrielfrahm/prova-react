import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Presentation } from './styles';
import api from '../../server/api';
import { useToast } from '../../hooks/Toast';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const location = useLocation();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'as senhas nao batem',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { password, password_confirmation } = data;

                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error();
                }
                await api.put('/reset-password', {
                    password,
                    password_confirmation,
                    token,
                });
                history.push('/');
                addToast({
                    type: 'success',
                    title: 'email enviado com sucesso',
                    description: 'check sua caixa de mensagem!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    type: 'error',
                    title: err.message,
                    description: 'Ocorreu um erro ao tentar enviar o email de recuperação',
                });
            }
        }, [addToast, location, history]);

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
                        <h1>Reset password</h1>
                        <div>
                            <Input name="token" type="hidden" />
                            <Input name="password" type="password" placeholder="Password" />
                            <Input name="password_confirmation" type="password" placeholder="confirme sua senha" />
                            <Button type="submit">Send Link  <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                        </div>
                    </Form>
                    <Link to='/'><FiArrowLeft style={{ verticalAlign: 'middle' }} /> Back</Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default ResetPassword;