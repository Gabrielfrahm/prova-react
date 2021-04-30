import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import { IState } from '../../store';
import { Container, Content } from './styles';
import api from '../../server/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const Account: React.FC = () => {

    const { addToast } = useToast();
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome Obrigatório'),
                    email: Yup.string()
                        .required('E-Mail Obrigatório')
                        .email('Digite um Email valido'),
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'as senhas nao batem',
                    ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.put(`/users/${user.id}`, data)
                history.push('/dashboard');
                addToast({
                    type: 'success',
                    title: 'Perfil atualizado',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro no Cadastro',
                    description:
                        'Ocorreu um erro ao tentar fazer ao atualizar perfil!',
                });

            }
        }, [history, addToast, user])

    return (
        <>
            <Container>
                <Content>
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initialData={{ name: user.name, email: user.email }}
                    >
                        <h1>Profile</h1>
                        <div>
                            <Input name="name" placeholder="Name" />
                            <Input name="email" placeholder="Email" />
                            <Input name="password" type="password" placeholder="Password" />
                            <Input name="password_confirmation" type="password" placeholder="confirmed Password" />
                            <Button type="submit">Update  <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                        </div>
                    </Form>
                    <Link to='/dashboard'><FiArrowLeft style={{ verticalAlign: 'middle' }} /> Back</Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default Account;
