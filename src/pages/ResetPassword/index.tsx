import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {Link} from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content,  Presentation } from './styles';

interface RestPasswordFormData {
    email: string;
}

const ResetPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: RestPasswordFormData) => {
            try{
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail Obrigatório').email('Digite um Email valido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });
                return console.log(data.email)
            }catch(err){
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
    },[])

    return (
        <>
            <Container>
                <Presentation>
                    <h2>The Geatest App</h2>
                    <span>for</span>
                    <h1>LOTTERY</h1>
                </Presentation>
                <Content>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Reset password</h1>
                        <div>
                            <Input name="email"  placeholder="Email" />
                            <Button type="submit">Send Link  <FiArrowRight  style={{verticalAlign: 'middle'}} /></Button>
                        </div>
                    </Form>
                    <Link to='/'><FiArrowLeft  style={{verticalAlign: 'middle'}} /> Back</Link>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default ResetPassword;