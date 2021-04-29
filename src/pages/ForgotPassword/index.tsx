import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Presentation } from './styles';
import api from '../../server/api';
import { useToast } from '../../hooks/Toast';

interface RestPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: RestPasswordFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail Obrigatório').email('Digite um Email valido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });
                await api.post('/forgot-Password', data);
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
        }, [addToast]);

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
                            <Input name="email" placeholder="Email" />
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

export default ForgotPassword;