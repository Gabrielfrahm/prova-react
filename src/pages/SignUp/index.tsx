import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../../store/modules/auth/action';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { IState } from '../../store';
import { Container, Content, Presentation } from './styles';
interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector<IState>(state => {
        if(state.auth.erro !== ''){
            return state.auth.erro;
        }
    });
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome Obrigatório'),
                    email: Yup.string().required('E-mail Obrigatório').email('Digite um Email valido'),
                    password: Yup.string().required('Senha Obrigatório'),
                })
                await schema.validate(data, {
                    abortEarly: false,
                });
                dispatch(signUpRequest({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }));
                if(state === ''){
                    history.push('/')
                }
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return; 
                }
            }
        }, [dispatch, history, state])

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
                        <h1>Registration</h1>
                        {state && 
                            <p style={{color: 'red', display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '12px'}}>
                                <FiAlertCircle size={40} /> {state}
                            </p>}
                        <div>
                            <Input name="name" placeholder="Name" />
                            <Input name="email" placeholder="Email" />
                            <Input name="password" type="password" placeholder="Password" />
                            <Button type="submit">Register  <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                        </div>
                    </Form>
                    <Link to='/'><FiArrowLeft style={{ verticalAlign: 'middle' }} /> Back</Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default SignUp;